import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Rx';
const URL = 'https://udemy-ng-http-befca.firebaseio.com/';

@Injectable()
export class ServerService {
	constructor(private http: Http) {}

	storeServers(servers: any[]) {

		const headers = new Headers({
			'Content-Type': 'application-json'
		});
		// ez nem küld, csak egy observable
		return this.http.post(
			URL + 'data.json',
			servers,
			{headers: headers}
		);	// data.json-> hova tárolom, én adom meg
	}

	getServers() {
		// ha itt konvertáljuk a kapott értéket, nem kell komponensenként megcsinálni
		return this.http.get(URL + 'data.jso')
		// map automatikusan Observable-be csomagolja a választ
		.map(
			(response: Response) => {
				const data = response.json();
				for (const server of data) {
					server.name = 'FETCHED_' + server.name;
				}
				return data;
			}
		)
		// catch NEM csomagol Observable-ba -> nekünk kell dobni a kivételt
		.catch(
			(error: Response) => {
				return Observable.throw('Something went wrong');
			}
		);
	}

	putServers(servers: any[]) {

		const headers = new Headers({
			'Content-Type': 'application-json'
		});
		// ez nem küld, csak egy observable
		return this.http.put(
			URL + 'data.json',
			servers,
			{headers: headers}
		);	// data.json-> hova tárolom, én adom meg
	}

	getAppName() {
		return this.http.get(URL + 'appName.json')
			.map(
				(response: Response) => {
					return response.json();
				}
			);
	}
}
