import ReactDOM from 'react-dom';
import React, { useState } from 'react';
import './index.css';

class AddTask extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      taskDesc: '',
    };
  }
  handleTaskTextChange(e) {
    this.setState({
      taskDesc: e.target.value,
    });
  }

  handleAddTaskClick() {
    this.props.handleToCollectTaskInfo(this.state.taskDesc);
    this.setState({
      taskDesc: '',
    });
  }

  render() {
    return (
      <form>
        <input
          type="text"
          value={this.state.taskDesc}
          onChange={(e) => this.handleTaskTextChange(e)}
        />
        <input
          type="button"
          value="Add Task"
          onClick={(e) => this.handleAddTaskClick()}
        />
      </form>
    );
  }
}

// function AddTask() {
//   const [taskDesc, setTaskDesc] = useState('');

//   const handleTaskTextChange = function (e) {
//     setTaskDesc(e.target.value);
//   };

//   const handleAddTaskClick = function (e) {
//     this.props.handleToCollectTaskInfo(this.state.taskDesc);
//     this.setState({
//       taskDesc: '',
//     });
//   };

//   return (
//     <>
//       <form>
//         <input
//           type="text"
//           value={taskDesc}
//           onChange={(e) => handleTaskTextChange}
//         />
//         <input
//           type="button"
//           value="Add Task"
//           onClick={(e) => handleAddTaskClick}
//         />
//       </form>
//     </>
//   );
// }

class TaskList extends React.Component {
  constructor(props) {
    super(props);
  }

  handleTaskClick(taskDesc) {
    this.props.handlerToCollectTaskClickInfo(taskDesc);
  }

  render() {
    let list = [];
    for (let i = 0; i < this.props.tasks.length; i++) {
      let task = this.props.tasks[i];
      let spanAction;
      if (task.isFinished === false) {
        spanAction = (
          <span
            class="material-symbols-outlined"
            onClick={() => this.handleTaskClick(task.desc)}
          >
            check_circle
          </span>
        );
      } else {
        spanAction = (
          <span
            class="material-symbols-outlined"
            onClick={() => this.handleTaskClick(task.desc)}
          >
            delete
          </span>
        );
      }
      let listItem = (
        <div key={i}>
          <span>
            {task.desc}
            {spanAction}
          </span>
        </div>
      );
      list.push(listItem);
    }

    return (
      <div className={this.props.forStyling}>
        <div className="list-container">
          <div className="title"> {this.props.purpose}</div>
          <div className="content">{list}</div>
        </div>
      </div>
    );
  }
}
class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tasks: [
        {
          desc: 'Make a Coffe for Yourself',
          isFinished: false,
        },
        {
          desc: 'Go for a walk in evening',
          isFinished: false,
        },
        {
          desc: 'Start Dev Lectures',
          isFinished: true,
        },
        {
          desc: 'Focus on Yourself',
          isFinished: true,
        },
      ],
    };
  }

  handleNewTask(task) {
    let oldTasks =
      this.state.tasks.slice(); /**we are making the copy of oldtasks....state cant be cahnged directly */
    oldTasks.push({
      desc: task,
      isFinished: false,
    });

    this.setState({
      tasks: oldTasks,
    });
  }

  handleTaskStatusUpdate(taskDesc, newState) {
    let oldTasks = this.state.tasks.slice();

    let taskItem = oldTasks.find((x) => x.desc == taskDesc);
    taskItem.isFinished = newState;

    this.setState({
      tasks: oldTasks,
    });
  }

  render() {
    let tasks = this.state.tasks;
    let todoTasks = tasks.filter((t) => t.isFinished == false);
    let doneTasks = tasks.filter((t) => t.isFinished == true);
    return (
      <>
        <div className="add-task">
          <AddTask
            handleToCollectTaskInfo={(task) =>
              this.handleNewTask(task)
            } /** handleToCollectTaskInfo is a attribute */
          />
        </div>
        <div className="task-lists">
          <TaskList
            handlerToCollectTaskClickInfo={(taskDesc) =>
              this.handleTaskStatusUpdate(taskDesc, true)
            }
            tasks={todoTasks}
            purpose="Todo"
            forStyling="todo"
          />
          <TaskList
            handlerToCollectTaskClickInfo={(taskDesc) =>
              this.handleTaskStatusUpdate(taskDesc, false)
            }
            tasks={doneTasks}
            purpose="Finished"
            forStyling="finished"
          />
        </div>
      </>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
