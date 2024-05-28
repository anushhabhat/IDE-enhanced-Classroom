/*class Plagiarism {
    constructor(firstText, secondText) {
      this.firstText = firstText
      this.secondText = secondText
    }
  
    static */ function checkPlagiarism(firstText, secondText, outputType = "scale") {
      // Tokenize the texts into words
      //secondText.replace('\r','')
      console.log("FIRST",firstText.length,"SECOND",secondText.length)
      const split_condition = /[" ""\r""\n"]/
      temp_words1 = firstText.split(split_condition)//to split with multiple delimiters using regex
      temp_words2 = secondText.split(split_condition)
      function isCorrect(value) { 
        return value != ''; 
      } 
      const words1= temp_words1.filter(isCorrect);
      const words2= temp_words2.filter(isCorrect);

      console.log("FIRST",words1,"\nSECOND",words2)
      // Create a set of unique words from both texts
      const uniqueWords = new Set([...words1, ...words2])
  
      // Create vectors representing the frequency of each word in the texts
      const vector1 = Array.from(uniqueWords).map(word =>
        words1.includes(word) ? 1 : 0
      )
  
      const vector2 = Array.from(uniqueWords).map(word =>
        words2.includes(word) ? 1 : 0
      )
  
      // Calculate the dot product of the vectors
      const dotProduct = vector1.reduce(
        (acc, value, index) => acc + value * vector2[index],
        0
      )
  
      // Calculate the magnitude of each vector
      const magnitude1 = Math.sqrt(
        vector1.reduce((acc, value) => acc + value ** 2, 0)
      )
      const magnitude2 = Math.sqrt(
        vector2.reduce((acc, value) => acc + value ** 2, 0)
      )
  
      // Calculate the cosine similarity
      const similarity = dotProduct / (magnitude1 * magnitude2)
  
      if (outputType === "percentage") {
        // Convert the similarity to a percentage
        const similarityPercentage = similarity * 100
        console.log("in plagfile val = "+similarity)
        return `${similarityPercentage.toFixed(2)}%`
      } else {
        // Return the similarity as a scale between 0 and 1
        return similarity
      }
    }
  //}
  
module.exports=
{
  checkPlagiarism
}
