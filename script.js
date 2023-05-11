const sub_btn = $("#opt_box_btn");
const load = $("#loading");


sub_btn.mouseover(() => {
	const category_text = $('#Category option:selected').text();
	$('#info_catg').text(category_text);

	const level = $('#level option:selected').val();
	const category = $('#Category option:selected').val();

	const url = `https://opentdb.com/api.php?amount=10&category=${category}&difficulty=${level}&type=boolean`;
	$(".loader").show();
	here(url);

	$(".opt_box").hide();
	$(".main").show();
})

function handle(event) {
	event.stopPropagation();
	const buttonId = $(this).text();
	if (buttonId === question.correct_answer) {
		alert("You Gotcha!!!...");
	}
	else {
		alert("Sorry...")
	}
	i++;
};

async function here(url) {
	const response = await fetch(url);

	if (response.status == 200) {
		$(".loader").hide();
	}

	const result = await response.json();
	console.log(result)

	const dataArr = result.results;

	console.log(dataArr);

	if (dataArr.response_code == 1) {
		let Empty = $(`<h1>Sorry, Your Quiz Type Was Not In Database!!...</h1>`)
		$(".main").append(Empty);
	}

	dataArr.forEach((data, i) => {
		console.log(data.question)

		let qaData = $(`<div class="q_a_box" data-id=${i}>
                            <h2 class="qst">${data.question}</h2>
                            <div class="t_f"> 
                                <button data-id="0" class="ans">True</button>
                                <button data-id="1" class="ans">False</button>
                                <button data-id="2" class="next">Next -></button>
                            </div>
                        </div>`);

		$(".main").append(qaData);

		const ansButtons = qaData.find(".ans");
		const nextButton = qaData.find(".next");
		nextButton.hide();

		ansButtons.on("click", function () {
			const currentButton = $(this);
			if (currentButton.text() == data.correct_answer) {
				alert("You Gotcha!!..")
			}else{alert("Sorry Buddy..")}
			ansButtons.hide();
			nextButton.show();
		});

		nextButton.on("click", function () {
			const currentQaData = $(this).closest(".q_a_box");
			currentQaData.hide();
			const nextQaData = currentQaData.next();
			if (nextQaData.length) {
				nextQaData.show();
			} else {
				// Show a message or do something else when all questions have been answered
				alert("You Take all the answers")
			}
		});
	});
}

