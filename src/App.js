import './App.css'
import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'

import TagButton from './Components/TagButton'

const tagsList = [
  {
    optionId: 'HEALTH',
    displayText: 'Health',
  },
  {
    optionId: 'EDUCATION',
    displayText: 'Education',
  },
  {
    optionId: 'ENTERTAINMENT',
    displayText: 'Entertainment',
  },
  {
    optionId: 'SPORTS',
    displayText: 'Sports',
  },
  {
    optionId: 'TRAVEL',
    displayText: 'Travel',
  },
  {
    optionId: 'OTHERS',
    displayText: 'Others',
  },
]

class App extends Component {
  state = {
    taskInput: '',
    tag: tagsList[0].displayText,
    tasksList: [],
    filter: false,
    activeFilter: '',
    filteredTasks: [],
  }

  inputChanged = event => {
    this.setState({taskInput: event.target.value})
  }

  OnFilter = id => {
    const {activeFilter} = this.state
    if (activeFilter === id) {
      this.setState({filter: false, activeFilter: ''})
    } else {
      const {tasksList} = this.state
      const updatedList = tasksList.filter(each => each.tag === id)
      this.setState({
        filter: true,
        filteredTasks: updatedList,
        activeFilter: id,
      })
    }
  }

  OnAdd = () => {
    const {taskInput, tag} = this.state
    const toAdd = {
      task: taskInput,
      tag,
    }
    this.setState(prev => ({
      taskInput: '',
      tag: tagsList[0].displayText,
      tasksList: [...prev.tasksList, toAdd],
    }))
  }

  optionChange = event => {
    this.setState({tag: event.target.value})
  }

  render() {
    const {taskInput, tag, tasksList, filter, filteredTasks} = this.state

    return (
      <div>
        <form>
          <h1>Create a task!</h1>
          <label htmlFor="task">Task</label>
          <input
            id="task"
            value={taskInput}
            placeholder="Enter the task here"
            type="text"
            onChange={this.inputChanged}
          />
          <label htmlFor="tag">Tags</label>
          <select id="tag" value={tag} onChange={this.optionChange}>
            {tagsList.map(each => (
              <option key={each.optionId} value={each.optionId}>
                {each.displayText}
              </option>
            ))}
          </select>
          <button type="button" onClick={this.OnAdd}>
            Add Task
          </button>
        </form>
        <div>
          <h1>Tags</h1>
          <ul>
            {tagsList.map(each => (
              <TagButton
                key={each.optionId}
                OnFilter={this.OnFilter}
                details={each}
              />
            ))}
          </ul>

          <h1>Tasks</h1>
          <ul>
            {filter &&
              filteredTasks.map(each => (
                <li key={uuidv4()}>
                  <p>{each.task}</p>
                  <p>{each.tag}</p>
                </li>
              ))}
          </ul>

          {filter && filteredTasks.length === 0 && <p>No Tasks Added Yet</p>}
          <ul>
            {filter === false &&
              tasksList.map(each => (
                <li key={uuidv4()}>
                  <p>{each.task}</p>
                  <p>{each.tag}</p>
                </li>
              ))}
          </ul>
          {filter === false && tasksList.length === 0 && (
            <p>No Tasks Added Yet</p>
          )}
        </div>
      </div>
    )
  }
}

export default App
