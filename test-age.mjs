import { calculateAgeBreakdown, calculateNextBirthdayCountdown, BIRTH_DATE_CONFIG } from './lib/ageCalculator.ts';

console.log('--- Testing Deterministic Dates for Talal Ahmad (DOB: 17 Oct 1999) ---');

// Test 1: 16 October 2026 12:00:00 (Day before 27th birthday)
const date16 = new Date(2026, 9, 16, 12, 0, 0); // Month is 0-indexed (9 = Oct)
const age16 = calculateAgeBreakdown(date16, BIRTH_DATE_CONFIG);
const countdown16 = calculateNextBirthdayCountdown(date16, BIRTH_DATE_CONFIG);
console.log('16 October 2026:');
console.log('  Age (years):', age16.years, '(Expected: 26)');
console.log('  Is birthday today:', age16.isBirthdayToday, '(Expected: false)');
console.log('  Countdown days left:', countdown16.days, '(Expected: 0 days, 12 hours left)');
console.log('  Countdown hours left:', countdown16.hours);
console.assert(age16.years === 26, 'FAIL: Age on 16 Oct 2026 should be 26');
console.assert(age16.isBirthdayToday === false, 'FAIL: 16 Oct is not birthday');

// Test 2: 17 October 2026 00:01:00 (Birthday day!)
const date17 = new Date(2026, 9, 17, 0, 1, 0);
const age17 = calculateAgeBreakdown(date17, BIRTH_DATE_CONFIG);
const countdown17 = calculateNextBirthdayCountdown(date17, BIRTH_DATE_CONFIG);
console.log('\n17 October 2026 (Birthday):');
console.log('  Age (years):', age17.years, '(Expected: 27)');
console.log('  Is birthday today:', age17.isBirthdayToday, '(Expected: true)');
console.log('  Countdown isToday:', countdown17.isToday, '(Expected: true)');
console.assert(age17.years === 27, 'FAIL: Age on 17 Oct 2026 should be 27');
console.assert(age17.isBirthdayToday === true, 'FAIL: 17 Oct is birthday');
console.assert(countdown17.isToday === true, 'FAIL: countdown isToday should be true');

// Test 3: 18 October 2026 14:00:00 (Day after 27th birthday)
const date18 = new Date(2026, 9, 18, 14, 0, 0);
const age18 = calculateAgeBreakdown(date18, BIRTH_DATE_CONFIG);
const countdown18 = calculateNextBirthdayCountdown(date18, BIRTH_DATE_CONFIG);
console.log('\n18 October 2026:');
console.log('  Age (years):', age18.years, '(Expected: 27)');
console.log('  Is birthday today:', age18.isBirthdayToday, '(Expected: false)');
console.log('  Countdown target year:', countdown18.targetBirthdayYear, '(Expected: 2027)');
console.assert(age18.years === 27, 'FAIL: Age on 18 Oct 2026 should be 27');
console.assert(age18.isBirthdayToday === false, 'FAIL: 18 Oct is not birthday');
console.assert(countdown18.targetBirthdayYear === 2027, 'FAIL: target year should be 2027');

console.log('\n>>> ALL DETERMINISTIC DATE & AGE CHECKS PASSED PERFECTLY! <<<');
