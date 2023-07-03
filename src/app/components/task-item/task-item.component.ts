import { Component, Input, Output,EventEmitter } from '@angular/core';
import { Task } from 'src/app/Task';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { faPencil } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.css']
})
export class TaskItemComponent {
  @Input() task !: Task;
  @Output() onDeleteTask: EventEmitter<Task> = new EventEmitter();
  @Output() onToggleReminder: EventEmitter<Task> = new EventEmitter();
  @Output() onUpdateTask: EventEmitter<Task> = new EventEmitter();

  faTimes = faTimes;
  faPen = faPencil
  onDelete(task:any) {
    this.onDeleteTask.emit(task)
  }

  onToggle(task:any) {
    this.onToggleReminder.emit(task)
  }  

  onUpdate(task: any){
    console.log(task);
    
      this.onUpdateTask.emit(task)
  }

}
