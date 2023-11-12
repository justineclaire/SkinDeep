import { useEffect, useState } from "react";
import React from "react";

function App() {

  const [data, setData] = useState([])

  useEffect(()=> {
    fetch('http://localhost:8081/skinIssues')
    .then(res => res.json())
    .then(data => setData(data))
    .catch(err => console.log(err));
  }, [])

  return (
    <div>
      <table>
        <thead>
          <th>ID</th>
          <th>issue</th>
        </thead>
        <tbody>
          {data.map((d, i) => (
            <tr key={i}>
              <td>{d.issueID}</td>
              <td>{d.issue}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default App;