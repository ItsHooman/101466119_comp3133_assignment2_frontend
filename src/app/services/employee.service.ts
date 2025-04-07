import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { gql } from 'apollo-angular';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class EmployeeService {
  constructor(private apollo: Apollo) {}

  getEmployees(): Observable<any> {
    return this.apollo.watchQuery({
      query: gql`
        query {
          employees {
            id
            name
            email
            position
            department
          }
        }
      `,
    }).valueChanges;
  }
  addEmployee(data: any): Observable<any> {
    return this.apollo.mutate({
      mutation: gql`
        mutation {
          addEmployee(
            name: "${data.name}",
            email: "${data.email}",
            position: "${data.position}",
            department: "${data.department}",
            profilePicture: "${data.profilePicture}"
          ) {
            id
            name
          }
        }
      `,
    });
  }
  
  getEmployeeById(id: string): Observable<any> {
    return this.apollo.watchQuery({
      query: gql`
        query {
          employee(id: "${id}") {
            id
            name
            email
            position
            department
          }
        }
      `,
    }).valueChanges;
  }
  updateEmployee(id: string, data: any): Observable<any> {
    return this.apollo.mutate({
      mutation: gql`
        mutation {
          updateEmployee(
            id: "${id}",
            name: "${data.name}",
            email: "${data.email}",
            position: "${data.position}",
            department: "${data.department}",
            profilePicture: "${data.profilePicture}"
          ) {
            id
            name
          }
        }
      `,
    });
  }
  
  deleteEmployee(id: string): Observable<any> {
    return this.apollo.mutate({
      mutation: gql`
        mutation {
          deleteEmployee(id: "${id}") {
            id
          }
        }
      `,
    });
  }
  
  
  
  
}

