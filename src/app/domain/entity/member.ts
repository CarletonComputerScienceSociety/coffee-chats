class Member {
  // the unique identifier of the member
  id: string;

  // the first name of the member
  firstName: string;

  // the last name of the member
  lastName: string;

  // whether the member actively participates or hasn't disbabled their account
  active: boolean;

  // staff status is used to give odd numbers of members a match
  staff: boolean;

  constructor(
    id: string,
    firstName: string,
    lastName: string,
    active: boolean,
    staff: boolean
  ) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.active = active;
    this.staff = staff;
  }
}

export default Member;
