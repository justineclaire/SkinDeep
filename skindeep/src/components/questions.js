const questions = [
      
    {
        question: "What is your skintype?",
        description: ["If your face feels tight and dry 30 seconds after washing it, you may have dry skin", "If your face feels shiny and makeup tends to 'slide' off you may have oily skin",
    "If your face simultaneously feels dry and tight in some areas but greasy and oily in others (T-zone) you may have combination skin", "If your skin feels hydrated and comfortable, but not oily, you likely have normal skin"],
        options: ["Dry", "Oily", "Combination", "Normal"],
        key: 'skintype'
    },
    {
        question: "Do you have sensitive skin?",
        description: ["Trying new products can break you out or cause red/swollen/itchy skin", "I am generally okay trying out new products"],
        options: ["Yes", "No not really"],
        key: 'sensitive'
    },
    {
        question: "Do you suffer from acne?",
        options: ["Yes - it's bad", "No not really"],
        key: 'acne'
    },
    {
        question: "Is ageing skin a concern for you? Fine lines/wrinkles ",
        description: ["You should really only worry about anti ageing if you are over 22 years old", "I have young skin, it is not a concern for me yet"],
        options: ["Yes", "No not really"],
        key: 'age'
    },
    {
        question: "Do you feel your skin needs brightening? (you want to brighten discolouration caused by acne/sun damage)",
        options: ["Yes", "No not really"],
        key: 'bright'
    },
    {
        question: "Are blackheads a problem for you?",
        options: ["Yes", "No not really"],
        key: 'bh'
    },
    {
        question: "Is redness a concern for you? your skin needs calming down",
        options: ["Yes", "No not really"],
        key: 'red'
    },
    {
        question: "Do you feel as though your skin needs smoothing?",
        description: ["It is bumpy and the texture could be better", "Nope, it is smooth enough"],
        options: ["Yes", "No not really"],
        key: 'tex'
    },
    {
        question: "Do you want to fix your skin barrier? Your skin barrier is a watertight seal that keeps the outermost layers of skin smoothly together",
        description: ["A damaged skin barrier will appear as skin that's rough, dry, or flaky", "When these outer layers are healthy, skin feels soft, supple and plump"],
        options: ["Yes", "No not really"],
        key: 'barrier'
    },
    {
        question: "Is hyperpigmentation a concern for you?",
        options: ["Yes", "No not really"],
        key: 'hyper'
    }
]

export default questions;