
let level = 'hard';
const url = `https://opentdb.com/api.php?amount=10&difficulty=${level}&type=boolean`;

async function here (url){
	const response = await fetch(url);
	const result = await response.json();
	const question = result.results[0];
	const options = [...question.incorrect_answers, question.correct_answer].sort();
	$("#ctgy").append(" "+question.category);
	$("#qst").append(" "+question.question);
	const div = $(".t_f");
  options.forEach(option => {
    const btn = $("<button>");
    btn.text(option);
    div.append(btn);
  });
  $("div").append(div);
  
};
here(url);