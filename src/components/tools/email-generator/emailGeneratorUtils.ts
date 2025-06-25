
const domains = [
  "gmail.com", "yahoo.com", "hotmail.com", "outlook.com", "aol.com",
  "icloud.com", "protonmail.com", "mail.com", "yandex.com", "zoho.com"
];

const firstNames = [
  "john", "jane", "mike", "sarah", "david", "lisa", "chris", "anna", "james", "mary",
  "robert", "patricia", "michael", "jennifer", "william", "linda", "richard", "elizabeth",
  "joseph", "barbara", "thomas", "susan", "charles", "jessica", "daniel", "karen"
];

const lastNames = [
  "smith", "johnson", "williams", "brown", "jones", "garcia", "miller", "davis",
  "rodriguez", "martinez", "hernandez", "lopez", "gonzalez", "wilson", "anderson",
  "thomas", "taylor", "moore", "jackson", "martin", "lee", "perez", "thompson"
];

export interface EmailGeneratorOptions {
  includeNumbers: boolean;
  includeDots: boolean;
  includeUnderscores: boolean;
}

export const generateRandomEmail = (
  selectedDomain: string,
  customDomain: string,
  options: EmailGeneratorOptions
): string => {
  const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
  const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
  
  let username = firstName;
  
  // Add separator and last name
  if (Math.random() > 0.3) {
    const separators = [];
    if (options.includeDots) separators.push(".");
    if (options.includeUnderscores) separators.push("_");
    if (separators.length === 0) separators.push(""); // No separator
    
    const separator = separators[Math.floor(Math.random() * separators.length)];
    username += separator + lastName;
  }
  
  // Add random numbers
  if (options.includeNumbers && Math.random() > 0.4) {
    const randomNum = Math.floor(Math.random() * 9999);
    username += randomNum;
  }
  
  // Select domain
  let domain;
  if (selectedDomain === "custom" && customDomain) {
    domain = customDomain;
  } else if (selectedDomain === "random") {
    domain = domains[Math.floor(Math.random() * domains.length)];
  } else {
    domain = selectedDomain;
  }
  
  return `${username}@${domain}`;
};

export { domains };
