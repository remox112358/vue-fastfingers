export const dictionary = [
  "over", "go", "at", "took", "you", "three", 
  "oil", "go", "page", "school", "white", 
  "each", "its", "point", "want", "food", 
  "never", "around", "got", "day", "work",
  "down", "time", "made", "four", "help", 
  "it", "later", "found", "have", "some", 
  "high", "below", "another", "near", "with", 
  "that", "good", "but", "which", "grow",
  "over", "go", "at", "took", "you", "three", 
  "oil", "go", "page", "school", "white", 
  "each", "its", "point", "want", "food", 
  "never", "around", "got", "day", "work",
  "down", "time", "made", "four", "help", 
  "it", "later", "found", "have", "some", 
  "high", "below", "another", "near", "with", 
  "that", "good", "but", "which", "grow",
  "over", "go", "at", "took", "you", "three", 
  "oil", "go", "page", "school", "white", 
  "each", "its", "point", "want", "food", 
  "never", "around", "got", "day", "work",
  "down", "time", "made", "four", "help", 
  "it", "later", "found", "have", "some", 
  "high", "below", "another", "near", "with", 
  "that", "good", "but", "which", "grow",
  "over", "go", "at", "took", "you", "three", 
  "oil", "go", "page", "school", "white", 
  "each", "its", "point", "want", "food", 
  "never", "around", "got", "day", "work",
  "down", "time", "made", "four", "help", 
  "it", "later", "found", "have", "some", 
  "high", "below", "another", "near", "with", 
  "that", "good", "but", "which", "grow",
  "over", "go", "at", "took", "you", "three", 
  "oil", "go", "page", "school", "white", 
  "each", "its", "point", "want", "food", 
  "never", "around", "got", "day", "work",
  "down", "time", "made", "four", "help", 
  "it", "later", "found", "have", "some", 
  "high", "below", "another", "near", "with", 
  "that", "good", "but", "which", "grow" 
]

export const getWords = count => {
  const shuffled = dictionary.sort(() => 0.5 - Math.random());

  return shuffled.slice(0, count);
}