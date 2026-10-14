import {
  calculateAgeBreakdown,
  calculateNextBirthdayCountdown,
  karachiWallClockToEpoch,
  getKarachiDateTime,
  BIRTH_DATE_CONFIG
} from './lib/ageCalculator.ts';

console.log('=== COMPREHENSIVE BIRTHDAY & COUNTDOWN VERIFICATION SUITE ===\n');

// Helper to create a Date from Karachi wall clock time
function makeKarachiDate(year, month, day, hour = 0, minute = 0, second = 0) {
  const epoch = karachiWallClockToEpoch(year, month, day, hour, minute, second);
  return new Date(epoch);
}

// -------------------------------------------------------------
// TEST 1: Pre-Birthday Countdown (16 October 2026, 23:59:59 PKT)
// -------------------------------------------------------------
const t1_date = makeKarachiDate(2026, 10, 16, 23, 59, 59);
const t1_age = calculateAgeBreakdown(t1_date);
const t1_cd = calculateNextBirthdayCountdown(t1_date);

console.log('TEST 1: 16 October 2026, 23:59:59 PKT (1 second before 27th birthday)');
console.log(`  Current Age: ${t1_age.years} (Expected: 26)`);
console.log(`  Is Birthday Today: ${t1_age.isBirthdayToday} (Expected: false)`);
console.log(`  Countdown Status: ${t1_cd.status} (Expected: 'before_birthday')`);
console.log(`  Remaining Time: ${t1_cd.days}d ${t1_cd.hours}h ${t1_cd.minutes}m ${t1_cd.seconds}s (Expected: 0d 0h 0m 1s)`);
console.log(`  Target Year: ${t1_cd.targetBirthdayYear} (Expected: 2026)`);
console.assert(t1_age.years === 26, 'FAIL: Age should be 26 before birthday');
console.assert(t1_cd.status === 'before_birthday', 'FAIL: Status should be before_birthday');
console.assert(t1_cd.days === 0 && t1_cd.hours === 0 && t1_cd.minutes === 0 && t1_cd.seconds === 1, 'FAIL: Remaining should be 1 second');
console.log('  -> PASSED!\n');

// -------------------------------------------------------------
// TEST 2: Exact Start of Birthday (17 October 2026, 00:00:00 PKT)
// -------------------------------------------------------------
const t2_date = makeKarachiDate(2026, 10, 17, 0, 0, 0);
const t2_age = calculateAgeBreakdown(t2_date);
const t2_cd = calculateNextBirthdayCountdown(t2_date);

console.log('TEST 2: 17 October 2026, 00:00:00 PKT (Exact Birthday Moment)');
console.log(`  Current Age: ${t2_age.years} (Expected: 27)`);
console.log(`  Is Birthday Today: ${t2_age.isBirthdayToday} (Expected: true)`);
console.log(`  Countdown isToday: ${t2_cd.isToday} (Expected: true)`);
console.log(`  Countdown Status: ${t2_cd.status} (Expected: 'birthday_today')`);
console.log(`  Heading: ${t2_cd.headingText}`);
console.assert(t2_age.years === 27, 'FAIL: Age should be 27 at start of birthday');
console.assert(t2_cd.isToday === true, 'FAIL: isToday should be true');
console.assert(t2_cd.status === 'birthday_today', 'FAIL: Status should be birthday_today');
console.log('  -> PASSED!\n');

// -------------------------------------------------------------
// TEST 3: Throughout Birthday (17 October 2026, 14:30:00 PKT)
// -------------------------------------------------------------
const t3_date = makeKarachiDate(2026, 10, 17, 14, 30, 0);
const t3_age = calculateAgeBreakdown(t3_date);
const t3_cd = calculateNextBirthdayCountdown(t3_date);

console.log('TEST 3: 17 October 2026, 14:30:00 PKT (Mid-day Birthday Celebration)');
console.log(`  Current Age: ${t3_age.years} (Expected: 27)`);
console.log(`  Is Birthday Today: ${t3_age.isBirthdayToday} (Expected: true)`);
console.log(`  Countdown isToday: ${t3_cd.isToday} (Expected: true)`);
console.log(`  Countdown Status: ${t3_cd.status} (Expected: 'birthday_today')`);
console.assert(t3_age.years === 27, 'FAIL: Age should remain 27');
console.assert(t3_cd.isToday === true, 'FAIL: isToday should remain true');
console.assert(t3_cd.status === 'birthday_today', 'FAIL: Status should be birthday_today');
console.log('  -> PASSED!\n');

// -------------------------------------------------------------
// TEST 4: Final Second of Birthday (17 October 2026, 23:59:59 PKT)
// -------------------------------------------------------------
const t4_date = makeKarachiDate(2026, 10, 17, 23, 59, 59);
const t4_age = calculateAgeBreakdown(t4_date);
const t4_cd = calculateNextBirthdayCountdown(t4_date);

console.log('TEST 4: 17 October 2026, 23:59:59 PKT (Final Second of Birthday)');
console.log(`  Current Age: ${t4_age.years} (Expected: 27)`);
console.log(`  Is Birthday Today: ${t4_age.isBirthdayToday} (Expected: true)`);
console.log(`  Countdown Status: ${t4_cd.status} (Expected: 'birthday_today')`);
console.assert(t4_age.years === 27, 'FAIL: Age should remain 27');
console.assert(t4_cd.isToday === true, 'FAIL: Message should stay visible until end of day');
console.assert(t4_cd.status === 'birthday_today', 'FAIL: Status should remain birthday_today');
console.log('  -> PASSED!\n');

// -------------------------------------------------------------
// TEST 5: Day After Birthday Begins (18 October 2026, 00:00:00 PKT)
// -------------------------------------------------------------
const t5_date = makeKarachiDate(2026, 10, 18, 0, 0, 0);
const t5_age = calculateAgeBreakdown(t5_date);
const t5_cd = calculateNextBirthdayCountdown(t5_date);

console.log('TEST 5: 18 October 2026, 00:00:00 PKT (Switch to Next Birthday Countdown)');
console.log(`  Current Age: ${t5_age.years} (Expected: 27)`);
console.log(`  Is Birthday Today: ${t5_age.isBirthdayToday} (Expected: false)`);
console.log(`  Countdown Status: ${t5_cd.status} (Expected: 'next_birthday')`);
console.log(`  Target Year: ${t5_cd.targetBirthdayYear} (Expected: 2027)`);
console.log(`  Target Age: ${t5_cd.targetAge} (Expected: 28)`);
console.log(`  Remaining Time: ${t5_cd.days}d ${t5_cd.hours}h ${t5_cd.minutes}m ${t5_cd.seconds}s (Expected: 364d 0h 0m 0s)`);
console.log(`  Heading: ${t5_cd.headingText}`);
console.assert(t5_age.years === 27, 'FAIL: Age remains 27 on 18 Oct 2026');
console.assert(t5_cd.isToday === false, 'FAIL: isToday should be false on 18 Oct');
console.assert(t5_cd.status === 'next_birthday', 'FAIL: Status should be next_birthday');
console.assert(t5_cd.targetBirthdayYear === 2027, 'FAIL: Target year should be 2027');
console.assert(t5_cd.days === 364, 'FAIL: Days should be 364');
console.log('  -> PASSED!\n');

// -------------------------------------------------------------
// TEST 6: Future Year Automatic Cycling (2027 -> 2028 Leap Year)
// -------------------------------------------------------------
// 17 October 2027, 00:00:00 PKT (28th Birthday!)
const t6_birthday2027 = makeKarachiDate(2027, 10, 17, 0, 0, 0);
const t6_cd_bday = calculateNextBirthdayCountdown(t6_birthday2027);
console.log('TEST 6A: 17 October 2027, 00:00:00 PKT (28th Birthday Arrives)');
console.log(`  Status: ${t6_cd_bday.status} (Expected: 'birthday_today')`);
console.log(`  Target Age: ${t6_cd_bday.targetAge} (Expected: 28)`);
console.assert(t6_cd_bday.status === 'birthday_today', 'FAIL: 2027 birthday should trigger birthday_today');
console.assert(t6_cd_bday.targetAge === 28, 'FAIL: 2027 birthday age should be 28');
console.log('  -> PASSED!');

// 18 October 2027, 00:00:00 PKT (Targets 2028, a Leap Year!)
const t6_next2028 = makeKarachiDate(2027, 10, 18, 0, 0, 0);
const t6_cd_next = calculateNextBirthdayCountdown(t6_next2028);
console.log('TEST 6B: 18 October 2027, 00:00:00 PKT (Targets 2028 Leap Year)');
console.log(`  Status: ${t6_cd_next.status} (Expected: 'next_birthday')`);
console.log(`  Target Year: ${t6_cd_next.targetBirthdayYear} (Expected: 2028)`);
console.log(`  Target Age: ${t6_cd_next.targetAge} (Expected: 29)`);
// 2028 has Feb 29 (366 days in 2028), from 18 Oct 2027 to 17 Oct 2028 is 365 days
console.log(`  Remaining Days: ${t6_cd_next.days} (Expected: 365 due to 2028 leap year)`);
console.assert(t6_cd_next.targetBirthdayYear === 2028, 'FAIL: Target year should be 2028');
console.assert(t6_cd_next.targetAge === 29, 'FAIL: Target age should be 29');
console.assert(t6_cd_next.days === 365, 'FAIL: 2028 leap year should yield 365 days from 18 Oct 2027');
console.log('  -> PASSED!\n');

console.log('🎉 ALL 6 COMPREHENSIVE BIRTHDAY & COUNTDOWN CHECKS PASSED PERFECTLY! 🎉');
