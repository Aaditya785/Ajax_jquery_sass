
let level = 'hard';
const url = `https://opentdb.com/api.php?amount=10&difficulty=${level}&type=multiple`;

async function here (url){
	const response = await fetch(url);
	const result = await response.json();
	const question = result.results[0];
	const options = [...question.incorrect_answers, question.correct_answer].sort();
	$("#ctgy").append(" "+question.category);
	$("#qst").append(" "+question.question);
	const ul = $("<ul>");
  options.forEach(option => {
    const li = $("<li>");
    li.text(option);
    ul.append(li);
  });
  $("body").append(ul);
  
};
here(url);