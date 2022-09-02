import { Component, OnInit } from '@angular/core';
import { DateTime } from 'luxon';

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.css']
})
export class HelpComponent implements OnInit {

  constructor() { }


  ngOnInit(): void {
    const questions=document.querySelectorAll('.question-answers');
    questions.forEach(function(question) {
      const btn=question.querySelector('.question');
      btn?.addEventListener("click", function(){
        questions.forEach(function(item){
          if (item!==question) {
            item.classList.remove('show-text');
          }
        })
        question.classList.toggle("show-text");
      });

    });
  }

}
