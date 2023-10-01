const sub_btn = $("#opt_box_btn");
const load = $("#loading");
var score = 0, bstScore = 0;
// localStorage.setItem("bstScore",score);


sub_btn.click(() => {
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

	if (result.response_code == 1) {
		let Empty = $(`<h1>Sorry, Your Quiz Type Was Not In Database!!...</h1>`)
		$(".main").append(Empty);
	}

	dataArr.forEach((data, i) => {
		console.log(data.question)

		let qaData = $(`<div class="q_a_box" data-id=${i}>
		     				<span class="q_no">${i + 1}/10</span>
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
				// alert("You Gotcha!!..");
				const sound = new Audio("/tune/correct.mp3");

				sound.play();
				score++;

			} else { 
				// alert("Sorry Buddy..") 
				const sound = new Audio("/tune/wrong.mp3");
				sound.play();
			}
			// ansButtons.hide();
			// nextButton.show();
			const currentQaData = $(this).closest(".q_a_box");
			currentQaData.hide();
			const nextQaData = currentQaData.next();
			if (nextQaData.length) {
				nextQaData.show();
			} else {
				// Show a message or do something else when all questions have been answered

				if (score > localStorage.getItem("bstScore")) {
					localStorage.setItem("bstScore", score);
				}

				$(".main").append(`<div  class="scoreCard">
				<h1>Your Score</h1>
				<div class="score">
					<p>Score: ${score}/10</p>
					<p>BestScore: ${localStorage.getItem("bstScore")}/10</p>
				</div>
				<button onclick="location.reload()" >Restart</button>

			</div>`);
			}
		});

		// nextButton.on("click", function () {
		// 	const currentQaData = $(this).closest(".q_a_box");
		// 	currentQaData.hide();
		// 	const nextQaData = currentQaData.next();
		// 	if (nextQaData.length) {
		// 		nextQaData.show();
		// 	} else {
		// 		// Show a message or do something else when all questions have been answered

		// 		if (score > localStorage.getItem(bstScore)) {
		// 			localStorage.setItem("bstScore", score);
		// 		}

		// 		$(".main").append(`<div  class="scoreCard">
		// 		<h1>Your Score</h1>
		// 		<div class="score">
		// 			<p>Score: ${score}/10</p>
		// 			<p>BestScore: ${localStorage.getItem("bstScore")}/10</p>
		// 		</div>
		// 		<button onclick="location.reload()" >Restart</button>

		// 	</div>`);
		// 	}
		// });
	});
}
