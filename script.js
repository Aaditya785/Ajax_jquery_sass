
// const level = $("#level").text();
// const category = $("#Category").text();
const sub_btn = $("#opt_box_btn");
const load = $("#loading");


sub_btn.click(()=>{
	const category_text = $('#Category option:selected').text();
	$('#info_catg').text(category_text);
	
	const level = $('#level option:selected').val();
	const category = $('#Category option:selected').val();
	
	const url = `https://opentdb.com/api.php?amount=10&category=${category}&difficulty=${level}&type=boolean`;
	here(url);
	
	$(".opt_box").hide();
	$(".main").show();
})


  
  async function here (url){
	const response = await fetch(url);
	const result = await response.json();
	console.log(result)
  
	const question = result.results[0];
	const options = [...question.incorrect_answers, question.correct_answer].sort();
	$("#ctgy").append(" "+question.category);
	$("#qst").append(" "+question.question);
	const div = $(".t_f");

	function handle(event) {
		event.stopPropagation();
		const buttonId = $(this).text();
		if(buttonId === question.correct_answer){
			alert("You Gotcha!!!...");
		}
		else{
			alert("Sorry...")
		}
	  };
  
	options.forEach((option, index) => {
	  const btn = $('<button data-id="'+index+'"  id="ans">');
	  btn.text(option);
	  btn.on('click', handle);
	  div.append(btn);
	});
  
	$("div").append(div);
  };
  


