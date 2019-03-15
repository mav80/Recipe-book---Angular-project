import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }


  copyCredentialsToClipboard() {
    /* Get the text field */
    const textToCopy = document.getElementById('btn').dataset.textToCopy;

    const node = document.createElement('textarea');
    node.textContent = textToCopy;
    node.style.position = 'absolute';
    node.style.left = '-10000px';
    document.body.appendChild(node);

    node.select();
    document.execCommand('copy');
    document.body.removeChild(node);

    /* Alert the copied text */
    // alert('Copied the text: ' + node.value);
  }


}
