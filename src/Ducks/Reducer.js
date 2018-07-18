const initialState = {
    quiz: {}
}

const SELECTED_QUIZ = 'SELECTED_QUIZ'

export default function reducer(state = initialState, action){
    switch (action.type) {
        case SELECTED_QUIZ:
            return Object.assign({}, state, {quiz: action.payload})
            break;
    
        default:
            break;
    }
}


export function selectedQuiz(quiz){
    return{
        type: SELECTED_QUIZ,
        payload: quiz
    }
}