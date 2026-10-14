/**
 * Birthday & Age Calculation Engine
 * 
 * Birthday recipient: Talal Ahmad
 * Date of birth: 17 October 1999
 * Timezone: Asia/Karachi (UTC+05:00) by default, user-configurable
 */

export interface TimezoneConfig {
  name: string;
  timeZone: string;
  utcOffsetHours: number; // e.g. +5 for Pakistan Standard Time
}

export const DEFAULT_TIMEZONE: TimezoneConfig = {
  name: 'Asia/Karachi (PKT, UTC+5)',
  timeZone: 'Asia/Karachi',
  utcOffsetHours: 5
};

export const BIRTH_DATE_CONFIG = {
  year: 1999,
  month: 10, // 1-indexed: October
  day: 17,
  hour: 0,
  minute: 0,
  second: 0
};

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
}

/**
 * Helper to get a Date object representing the given date in the target timezone.
 */
export function getZonedDate(date: Date = new Date(), offsetHours: number = DEFAULT_TIMEZONE.utcOffsetHours): Date {
  const utc = date.getTime() + date.getTimezoneOffset() * 60000;
  return new Date(utc + 3600000 * offsetHours);
}

/**
 * Calculate accurate age and elapsed time since 17 October 1999.
 * Handles calendar-aware months and leap years correctly.
 */
export function calculateAgeBreakdown(
  nowZoned: Date = getZonedDate(),
  birthConfig = BIRTH_DATE_CONFIG
): AgeBreakdown {
  const currentYear = nowZoned.getFullYear();
  const currentMonth = nowZoned.getMonth() + 1; // 1-indexed
  const currentDay = nowZoned.getDate();
  const currentHour = nowZoned.getHours();
  const currentMinute = nowZoned.getMinutes();
  const currentSecond = nowZoned.getSeconds();

  // Create birth Date object in the same zoned coordinate space
  const birthDateZoned = new Date(
    birthConfig.year,
    birthConfig.month - 1,
    birthConfig.day,
    birthConfig.hour,
    birthConfig.minute,
    birthConfig.second
  );

  const totalDiffMs = Math.max(0, nowZoned.getTime() - birthDateZoned.getTime());
  const totalSeconds = Math.floor(totalDiffMs / 1000);
  const totalMinutes = Math.floor(totalSeconds / 60);
  const totalHours = Math.floor(totalMinutes / 60);
  const totalDays = Math.floor(totalHours / 24);

  // Calendar-aware year and month calculation:
  let years = currentYear - birthConfig.year;
  const hasHadBirthdayThisYear =
    currentMonth > birthConfig.month ||
    (currentMonth === birthConfig.month && currentDay >= birthConfig.day);

  if (!hasHadBirthdayThisYear) {
    years -= 1;
  }

  // Determine the date of the most recent birthday
  const lastBirthdayYear = hasHadBirthdayThisYear ? currentYear : currentYear - 1;
  const lastBirthdayDate = new Date(
    lastBirthdayYear,
    birthConfig.month - 1,
    birthConfig.day,
    birthConfig.hour,
    birthConfig.minute,
    birthConfig.second
  );

  // Calculate calendar months since last birthday:
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
    upcomingAge
  };
}

/**
 * Calculate countdown to next birthday (17 October).
 */
export function calculateNextBirthdayCountdown(
  nowZoned: Date = getZonedDate(),
  birthConfig = BIRTH_DATE_CONFIG
): CountdownBreakdown {
  const currentYear = nowZoned.getFullYear();
  const currentMonth = nowZoned.getMonth() + 1;
  const currentDay = nowZoned.getDate();

  const isToday = currentMonth === birthConfig.month && currentDay === birthConfig.day;

  // Next birthday year:
  // If today is birthday, the next birthday countdown is either today's celebration or next year's.
  // We'll target today's 00:00 until it ends, or if today is birthday, mark isToday = true.
  let targetYear = currentYear;
  const alreadyPassedThisYear =
    currentMonth > birthConfig.month ||
    (currentMonth === birthConfig.month && currentDay > birthConfig.day);

  if (alreadyPassedThisYear) {
    targetYear += 1;
  }

  const targetDate = new Date(
    targetYear,
    birthConfig.month - 1,
    birthConfig.day,
    birthConfig.hour,
    birthConfig.minute,
    birthConfig.second
  );

  let diffMs = targetDate.getTime() - nowZoned.getTime();

  if (isToday) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      isToday: true,
      targetBirthdayYear: currentYear
    };
  }

  if (diffMs < 0) {
    // If passed, next year
    targetYear += 1;
    const nextTarget = new Date(
      targetYear,
      birthConfig.month - 1,
      birthConfig.day,
      birthConfig.hour,
      birthConfig.minute,
      birthConfig.second
    );
    diffMs = Math.max(0, nextTarget.getTime() - nowZoned.getTime());
  }

  const totalSecs = Math.floor(diffMs / 1000);
  const seconds = totalSecs % 60;
  const totalMins = Math.floor(totalSecs / 60);
  const minutes = totalMins % 60;
  const totalHrs = Math.floor(totalMins / 60);
  const hours = totalHrs % 24;
  const days = Math.floor(totalHrs / 24);

  return {
    days,
    hours,
    minutes,
    seconds,
    isToday: false,
    targetBirthdayYear: targetYear
  };
}
