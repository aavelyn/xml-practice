import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { element } from 'protractor';

declare var wgxpath: any;
declare var document: any;

wgxpath.install()

let xhttp = new XMLHttpRequest();


@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
	title = 'app';

	xmlPath: string = 'assets/books.xml';
	xml: XMLDocument;

	input: string = '/bookstore/book[1]'
	input$ = new Subject<string>();
	showResult = [];

	ngOnInit() {
		xhttp.onreadystatechange = (event) => {
			if (xhttp.responseXML) {
				this.xml = xhttp.responseXML;
				this.evalXML()
				document.getElementById("xml").textContent = new XMLSerializer().serializeToString(this.xml);
			}
		}
		xhttp.open("GET", this.xmlPath, true);
		xhttp.send();
		// this.input$.debounceTime(300).distinctUntilChanged().subscribe((res) => {
		// 	this.evalXML()
		// })
	}

	evalXML() {
		this.showResult = [];
		let xml = this.xml;
		let nodes
		try {
			nodes = document.evaluate(this.input, xml, null, XPathResult.ANY_TYPE, null);
		} catch (err) {
			console.error(err);
		}
		let result = nodes.iterateNext();
		while (result) {
			let childValue = [];
			if (result.childNodes) {
				console.log(result.childNodes)
				result.childNodes.forEach(element => {

					let innerHtml =  element.innerHTML;
					let nodeValue = element.nodeValue;
					if(innerHtml){childValue.push(`${element.nodeName}: ${innerHtml}`)}
					if(nodeValue && nodeValue.trim().length >0){childValue.push(`${element.nodeName}: ${nodeValue}`)}
				});
			}

			this.showResult.push(childValue)
			result = nodes.iterateNext()
		}
	}

	inputChange(event) {
		this.input = event;
		this.input$.next(this.input)
	}
}
