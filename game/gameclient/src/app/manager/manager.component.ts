import { Component, OnInit } from '@angular/core';
import { User } from '../_models/index';
import { UserService } from '../_services/index';

@Component({
    moduleId: module.id,
    templateUrl: 'manager.component.html'
})

export class ManagerComponent implements OnInit {
    currentUser: User;
    servers: any;

    constructor(private userService: UserService) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }

    ngOnInit() {
        console.log('ngOnInit');
        this.loadAllServers();
    }


    private loadAllServers() {
        console.log('loadAllServers');
        this.userService.getAllServers(this.currentUser).subscribe(servers => { this.servers = servers;
            console.log(servers);
        });
    }
}