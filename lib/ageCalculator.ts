/**
 * Birthday & Age Calculation Engine
 * 
 * Birthday recipient: Talal Ahmad
 * Date of birth: 17 October 1999
 * Time zone: Asia/Karachi (Pakistan Standard Time, UTC+05:00)
 */

export interface TimezoneConfig {
  name: string;
  timeZone: string;
  utcOffsetHours: number; // +5 for Pakistan Standard Time (PKT)
}

export const DEFAULT_TIMEZONE: TimezoneConfig = {
  name: 'Asia/Karachi (PKT, UTC+5)',
  timeZone: 'Asia/Karachi',
  utcOffsetHours: 5,
};

export const BIRTH_DATE_CONFIG = {
  year: 1999,
  month: 10, // 1-indexed: October
  day: 17,
  hour: 0,
  minute: 0,
  second: 0,
};

export interface KarachiDateTime {
  year: number;
  month: number; // 1-12
  day: number;
  hour: number;
  minute: number;
  second: number;
}

export interface AgeBreakdown {
  years: number;
  months: number; // completed calendar months within the current age year
  totalDays: number;
  totalHours: number;
  totalMinutes: number;
  totalSeconds: number;
  isBirthdayToday: boolean;
  upcomingAge: number;
}

export interface CountdownBreakdown {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isToday: boolean;
  targetBirthdayYear: number;
  targetAge: number;
  status: 'before_birthday' | 'birthday_today' | 'next_birthday';
  headingText: string;
}

/**
 * Extracts exact wall-clock year, month, day, hour, minute, second in Asia/Karachi.
 * Guaranteed to reflect Pakistan Standard Time regardless of the client/browser timezone.
 */
export function getKarachiDateTime(date: Date = new Date()): KarachiDateTime {
  const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Asia/Karachi',
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hourCycle: 'h23',
  });

  const parts = formatter.formatToParts(date);
  const get = (type: string) => {
    const p = parts.find((part) => part.type === type);
    return p ? parseInt(p.value, 10) : 0;
  };

  return {
    year: get('year'),
    month: get('month'),
    day: get('day'),
    hour: get('hour'),
    minute: get('minute'),
    second: get('second'),
  };
}

/**
 * Helper to get a Date object representing the given date in the target timezone coordinates.
 * Kept for backward compatibility with components expecting getZonedDate.
 */
export function getZonedDate(date: Date = new Date(), offsetHours: number = DEFAULT_TIMEZONE.utcOffsetHours): Date {
  const utc = date.getTime() + date.getTimezoneOffset() * 60000;
  return new Date(utc + 3600000 * offsetHours);
}

/**
 * Converts a wall-clock date & time in Asia/Karachi (UTC+5) to absolute UTC epoch milliseconds.
 * Since PKT is UTC+5 year-round without daylight saving changes, offset is fixed at 5 hours.
 */
export function karachiWallClockToEpoch(
  year: number,
  month: number,
  day: number,
  hour: number = 0,
  minute: number = 0,
  second: number = 0
): number {
  return Date.UTC(year, month - 1, day, hour - 5, minute, second);
}

/**
 * Calculate accurate age and elapsed time since 17 October 1999 (00:00:00 PKT).
 * Fully calendar-aware with leap years and exact time elapsed.
 */
export function calculateAgeBreakdown(
  now: Date = new Date(),
  birthConfig = BIRTH_DATE_CONFIG
): AgeBreakdown {
  const nowEpoch = now.getTime();
  const birthEpoch = karachiWallClockToEpoch(
    birthConfig.year,
    birthConfig.month,
    birthConfig.day,
    birthConfig.hour,
    birthConfig.minute,
    birthConfig.second
  );

  const totalDiffMs = Math.max(0, nowEpoch - birthEpoch);
  const totalSeconds = Math.floor(totalDiffMs / 1000);
  const totalMinutes = Math.floor(totalSeconds / 60);
  const totalHours = Math.floor(totalMinutes / 60);
  const totalDays = Math.floor(totalHours / 24);

  // Karachi wall clock parts
  const karachi = getKarachiDateTime(now);
  const currentYear = karachi.year;
  const currentMonth = karachi.month;
  const currentDay = karachi.day;

  // Has celebrated birthday this calendar year?
  const hasHadBirthdayThisYear =
    currentMonth > birthConfig.month ||
    (currentMonth === birthConfig.month && currentDay >= birthConfig.day);

  let years = currentYear - birthConfig.year;
  if (!hasHadBirthdayThisYear) {
    years -= 1;
  }

  // Determine last completed birthday year
  const lastBirthdayYear = hasHadBirthdayThisYear ? currentYear : currentYear - 1;

  // Calendar months calculation since last birthday:
  let months = (currentYear - lastBirthdayYear) * 12 + (currentMonth - birthConfig.month);
  if (currentDay < birthConfig.day) {
    months -= 1;
  }
  months = Math.max(0, months % 12);

  const isBirthdayToday =
    currentMonth === birthConfig.month && currentDay === birthConfig.day;

  const upcomingAge = isBirthdayToday ? years : years + 1;

  return {
    years,
    months,
    totalDays,
    totalHours,
    totalMinutes,
    totalSeconds,
    isBirthdayToday,
    upcomingAge,
  };
}

/**
 * Calculate countdown to birthday with 3 dynamic, automatic states:
 * 1. Before Birthday: Countdown to 17 Oct 00:00:00 PKT (Days, Hours, Minutes, Seconds)
 * 2. During Birthday (17 Oct 00:00:00 to 23:59:59 PKT): isToday = true, celebratory display
 * 3. After Birthday (18 Oct 00:00:00 PKT onwards): Countdown to 17 Oct 00:00:00 PKT of following year
 * 
 * Works automatically for 2026, 2027, 2028, and all future years indefinitely.
 */
export function calculateNextBirthdayCountdown(
  now: Date = new Date(),
  birthConfig = BIRTH_DATE_CONFIG
): CountdownBreakdown {
  const karachi = getKarachiDateTime(now);
  const nowEpoch = now.getTime();

  const isToday = karachi.month === birthConfig.month && karachi.day === birthConfig.day;

  // Case 2: Today is the Birthday (17 October 00:00:00 to 23:59:59 PKT)
  if (isToday) {
    const age = karachi.year - birthConfig.year;
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      isToday: true,
      targetBirthdayYear: karachi.year,
      targetAge: age,
      status: 'birthday_today',
      headingText: `Happy ${age}th Birthday, Talal! ❤️`,
    };
  }

  // Determine target year
  // If before 17 Oct this year -> target is this year's 17 Oct 00:00:00 PKT
  // If on or after 18 Oct this year -> target is next year's 17 Oct 00:00:00 PKT
  const isPastThisYearBirthday =
    karachi.month > birthConfig.month ||
    (karachi.month === birthConfig.month && karachi.day > birthConfig.day);

  const targetYear = isPastThisYearBirthday ? karachi.year + 1 : karachi.year;
  const targetAge = targetYear - birthConfig.year;

  const targetEpoch = karachiWallClockToEpoch(
    targetYear,
    birthConfig.month,
    birthConfig.day,
    0,
    0,
    0
  );

  const diffMs = Math.max(0, targetEpoch - nowEpoch);
  const totalSecs = Math.floor(diffMs / 1000);
  const seconds = totalSecs % 60;
  const totalMins = Math.floor(totalSecs / 60);
  const minutes = totalMins % 60;
  const totalHrs = Math.floor(totalMins / 60);
  const hours = totalHrs % 24;
  const days = Math.floor(totalHrs / 24);

  const status: 'before_birthday' | 'next_birthday' = isPastThisYearBirthday
    ? 'next_birthday'
    : 'before_birthday';

  const headingText = isPastThisYearBirthday
    ? `Next Birthday In ❤️ (17 October ${targetYear})`
    : `Countdown to ${targetAge}th Birthday (17 October ${targetYear})`;

  return {
    days,
    hours,
    minutes,
    seconds,
    isToday: false,
    targetBirthdayYear: targetYear,
    targetAge,
    status,
    headingText,
  };
}
