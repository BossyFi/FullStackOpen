import {useState} from 'react'

const Title = ({text}) => <h1>{text}</h1>

const Button = ({text, onClick}) => <button onClick={onClick}>{text}</button>

const StatisticLine = ({text, value, symbol}) => <p>{text} {value} {symbol}</p>

const StatisticRow = ({text, value, symbol}) => {
    return (
        <tr>
            <td>{text}</td>
            <td>{value} {symbol}</td>
        </tr>
    )
}

const Statistics = (props) => {
    if (props.statsInfo.info[3].value !== 0) {
        return (
            <div>
                <Title text={props.statsInfo.name}/>
                <table>
                    <tbody>
                    <StatisticRow text={props.statsInfo.info[0].name}
                                  value={props.statsInfo.info[0].value}></StatisticRow>
                    <StatisticRow text={props.statsInfo.info[1].name}
                                  value={props.statsInfo.info[1].value}></StatisticRow>
                    <StatisticRow text={props.statsInfo.info[2].name}
                                  value={props.statsInfo.info[2].value}></StatisticRow>
                    <StatisticRow text={props.statsInfo.info[3].name}
                                  value={props.statsInfo.info[3].value}></StatisticRow>
                    <StatisticRow text={props.statsInfo.info[4].name}
                                  value={props.statsInfo.info[4].value}></StatisticRow>
                    <StatisticRow text={props.statsInfo.info[5].name}
                                  value={props.statsInfo.info[5].value} symbol={"%"}></StatisticRow>
                    </tbody>
                </table>
            </div>
        )
    } else {
        return (
            <div>
                <Title text={props.statsInfo.name}/>
                <StatisticLine text={"No feedback given"}/>
            </div>
        )
    }

}

const App = () => {
    // guarda los clics de cada botón en su propio estado
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)
    const [all, setAll] = useState(0)

    const IncrementGood = () => {
        setGood(good + 1)
        setAll(all + 1)
    }
    const IncrementNeutral = () => {
        setNeutral(neutral + 1)
        setAll(all + 1)
    }
    const IncrementBad = () => {
        setBad(bad + 1)
        setAll(all + 1)
    }

    const Average = () => {
        if (all === 0) {
            return 0
        }
        return (good - bad) / all
    }

    const PositivePercentage = () => {
        if (all === 0) {
            return 0
        }
        return (good / all) * 100
    }
    const statisticsInfo = {
        name: "Statistics",
        info: [
            {
                name: "Good",
                value: good
            },
            {
                name: "Neutral",
                value: neutral
            },
            {
                name: "Bad",
                value: bad
            },
            {
                name: "All",
                value: all
            },
            {
                name: "Average",
                value: Average()
            },
            {
                name: "Positive",
                value: PositivePercentage()
            }
        ]

    }
    return (
        <>
            <Title text={"Give Feedback"}/>
            <Button text={"Good"} onClick={IncrementGood}/>
            <Button text={"Neutral"} onClick={IncrementNeutral}/>
            <Button text={"Bad"} onClick={IncrementBad}/>
            <Statistics statsInfo={statisticsInfo}/>
        </>
    )
}

export default App