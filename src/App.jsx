import { useState, useEffect, Fragment } from 'react'
import './App.css'
import Header from './components/Header'
import Info from './components/Info'

function App() {

  return (
    <div>
      <Header />
      <Info />
      <Quiz />
    </div>
)
}

const Quiz = () => {
  const [questionIndex, setQuestionIndex] = useState(null);
  const [answerStatus, setAnswerStatus] = useState(null);
  const [correctAnswerCount, setCorrectAnswerCount] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);

  useEffect(() => {
  	setAnswerStatus(null)
  }, [questionIndex])
  
  useEffect(() => {
  	if (answerStatus) {
			setCorrectAnswerCount(count => count + 1)
		}
  }, [answerStatus])

  const onNextClick = () => {
  	if (questionIndex === questions.length - 1) {
    	setQuizComplete(true)
    } else {
    	setQuestionIndex(questionIndex == null ? 0 : questionIndex + 1)
		}
  }
  
  const onRestartClick = () => {
  	setQuizComplete(false)
    setQuestionIndex(null)
    setCorrectAnswerCount(0)
  }

  if (questionIndex == null) {
    return (
      <div className="quiz">
        <button onClick={onNextClick}>START</button>
      </div>
    )
  }

  return (
    <div className="quiz">
      {quizComplete ? (
          <p> {correctAnswerCount} / {questions.length} correct</p>
      ) : (
       <div>
        <ProgressBar currentQuestionIndex={questionIndex} totalQuestionsCount={questions.length} />
        <Question 
          question={questions[questionIndex]} 
          setAnswerStatus={setAnswerStatus}
        />
        {answerStatus != null && (
          <div>
            <div className="answerStatus">{!!answerStatus ? "CORRECT :)" : "INCORRECT :("} </div>
            <button onClick={onNextClick}>
            {questionIndex === questions.length - 1 ? "SEE RESULTS" : "NEXT ->"}
            </button>
          </div>
        )}
      </div>
      )}
      
      {questionIndex != null && <button onClick={onRestartClick}>QUIT</button>}
    </div>
  )
}



const Question = ({ question, setAnswerStatus }) => {
	const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null)
	
  useEffect(() => {
  	if (selectedAnswerIndex != null) {
    	setAnswerStatus(selectedAnswerIndex === question.correctAnswerIndex)
    }
  }, [selectedAnswerIndex])
  
  useEffect(() => {
  	setSelectedAnswerIndex(null)
  }, [question])
  
  const getClasses = (index) => {
  	let classes = []
    if (selectedAnswerIndex != null) {
      if (selectedAnswerIndex === index) {
        classes.push("selected")
      }
      if (index === question.correctAnswerIndex) {
        if (selectedAnswerIndex === index) {
          classes.push("correct")
        } else {
          classes.push("incorrect")
        }
      }
    }
    
    return classes.join(" ")
  }
  
	return (
  	<div>
      <div className="questionText">{question.question}</div>
      <div className="answers">
        {question.answers.map((answer, index) => {
        	return <div key={index} className={`answer ${getClasses(index)}`} onClick={() => selectedAnswerIndex == null && setSelectedAnswerIndex(index)}>{answer}</div>
      	})}
      </div>
    </div>
 )
}



const ProgressBar = ({ currentQuestionIndex, totalQuestionsCount }) => {
	const progressPercentage = (currentQuestionIndex / totalQuestionsCount) * 100
  
	return <div className="progressBar">
    <div className="text">{currentQuestionIndex} ANSWERED ({totalQuestionsCount - currentQuestionIndex} REMAINING)</div>
    <div className="inner" style={{ width: `${progressPercentage}%` }} />
	</div>
}




const questions = [
	{
  	question: "This twisted tortured mess",
  	answers: ["Barrel of a Gun", "Clean", "Wrong"],
  	correctAnswerIndex: 0
  },
  {
  	question: "Take second best put me to the test",
  	answers: ["In Your Room", "Nothing", "Personal Jesus"],
  	correctAnswerIndex: 2
  },
  {
  	question: "All the  things I detest I will almost like",
  	answers: ["Somebody", "A Question of Lust", "In Your Room"],
  	correctAnswerIndex: 0
  },
  {
  	question: "Girl of sixteen, whole life ahead of her",
  	answers: ["Nothing", "Blasphemous Rumours", "Little 15"],
  	correctAnswerIndex: 1
  },
  {
  	question: "Is simplicity best or simply the easiest?",
  	answers: ["Judas", "Rush", "Clean"],
  	correctAnswerIndex: 0
  },
  {
  	question: "Words like violence break the silence",
  	answers: ["It's No Good", "Enjoy the Silence", "People are People"],
  	correctAnswerIndex: 1
  },
  {
  	question: "Never again is what you swore the time before",
  	answers: ["Policy of Truth", "Black Celebration", "Never Let Me Down Again"],
  	correctAnswerIndex: 0
  },
  {
  	question: "Tonight I'm in the hands of fate",
  	answers: ["Behind the Wheel", "But Not Tonight", "Home"],
  	correctAnswerIndex: 0
  },
  {
  	question: "I can feel depression all around",
  	answers: ["Work Hard", "Something to do", "Black Celebration"],
  	correctAnswerIndex: 1
  },



  // {
  // 	question: "Travel my way take the highway that's the best",
  // 	answers: ["World in My Eyes", "Behind the Wheel", "Route 66"],
  // 	correctAnswerIndex: 2
  // },
  // {
  // 	question: "Operating generating",
  // 	answers: ["Work Hard", "Useless", "New Life"],
  // 	correctAnswerIndex: 2
  // },
  // {
  // 	question: "It all seems so stupid",
  // 	answers: ["Shame", "Puppets", "Useless"],
  // 	correctAnswerIndex: 0
  // },
  // {
  // 	question: "Whatever you've planned for me, I'm not the one",
  // 	answers: ["Useless", "It's No Good", "Barrel of a Gun"],
  // 	correctAnswerIndex: 2
  // },
  // {
  // 	question: "Oh God it's raining",
  // 	answers: ["Judas", "But Not Tonight", "The Landscape is changing"],
  // 	correctAnswerIndex: 1
  // },
  // {
  // 	question: "I need to drink more than you seem to think before I'm anyone's",
  // 	answers: ["A Question of Lust", "The Meaning of Love", "Stripped"],
  // 	correctAnswerIndex: 0
  // },
  // {
  // 	question: "Your optimistic eyes seem like paradise to someone like me",
  // 	answers: ["Stripped", "World in My Eyes", "Black Celebration"],
  // 	correctAnswerIndex: 2
  // },
  // {
  // 	question: "I stand still stepping on a shady street",
  // 	answers: ["Dreaming of Me", "New Life", "Walking in My Shoes"],
  // 	correctAnswerIndex: 1
  // },
  // {
  // 	question: "We walk together, we're walking down the street",
  // 	answers: ["Just can't get enough", "New Life", "Dreaming of Me"],
  // 	correctAnswerIndex: 1
  // },
  // {
  // 	question: "Exercise your basic rights",
  // 	answers: ["If you want", "Where's the Revolution", "Work Hard"],
  // 	correctAnswerIndex: 0
  // },




  // {
  // 	question: "I dont' advice and I don't criticise",
  // 	answers: ["Jezebel", "Personal Jesus", "Blue Dress"],
  // 	correctAnswerIndex: 2
  // },
  // {
  // 	question: "I can't stand this emotional violence",
  // 	answers: ["Leave in Silence", "A Question of Lust", "Meaning of Love"],
  // 	correctAnswerIndex: 0
  // },
  // {
  // 	question: "You know by now, it takes a lot to see me hurt",
  // 	answers: ["Dangerous", "Master and Servant", "Useless"],
  // 	correctAnswerIndex: 0
  // },
  // {
  // 	question: "Your pretty dress is oilstained, from working too hard for too little",
  // 	answers: ["Work Hard", "Something to do", "New Dress"],
  // 	correctAnswerIndex: 1
  // },
  // {
  // 	question: "Nothing comes easy, it never will",
  // 	answers: ["Policy of Truth", "Everything Counts", "Work Hard"],
  // 	correctAnswerIndex: 2
  // },
  // {
  // 	question: "Trying to sell the story of love's eternal glory",
  // 	answers: ["Nothing", "Sacred", "Meaning of Love"],
  // 	correctAnswerIndex: 1
  // },
  






  // {
  // 	question: "",
  // 	answers: ["", "", ""],
  // 	correctAnswerIndex: 1
  // },
]


export default App
