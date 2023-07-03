import { Component, OnInit } from '@angular/core';
import { Task } from '../../Task'
import { TaskService } from 'src/app/services/task.service';
import { FormControl, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})

export class TasksComponent {

  form!: FormGroup;

  tasks: Task[] = [];

  data: any;

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
     this.taskService.getTasks().subscribe((tasks)=>(this.tasks = tasks));
     this.form = new FormGroup({
      text: new FormControl('') , // initial value for the text field
      day: new FormControl(''), // initial value for the day field
      reminder: new FormControl(false),
  })
  }

  deleteTask(task: Task) {
    this.taskService.deleteTask(task).subscribe(()=>(this.tasks = this.tasks.filter(t => t.id !== task.id)));
  }

  toggleReminder(task: Task) {
    task.reminder = !task.reminder
    this.taskService.updateTasksReminder(task).subscribe();
  }

  addTask(task: Task) {
    this.taskService.addTask(task).subscribe((task)=>(this.tasks.push(task)));
  }

  updateTask(task: Task) {
    
    this.data = task  

      console.log("hiiii" + task.text);

      this.form.controls['text'].setValue(task.text);
      this.form.controls['day'].setValue(task.day);
      this.form.controls['reminder'].setValue(task.reminder);

  }

  updateSub() {
      const updatedTask: Task = {
        text: this.form.value.text,
        day: this.form.value.day,
        reminder: this.form.value.reminder
      };
      this.taskService.updateTasks(updatedTask).subscribe((response) => {
        console.log('Task updated successfully:', response);
        // Update this.tasks if needed
        // this.tasks = response.updatedTask;
      });
       
  }

}
