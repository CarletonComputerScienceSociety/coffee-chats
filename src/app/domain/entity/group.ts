import { Member } from ".";

class Group {
  members: Member[];

  constructor(members: Member[]) {
    this.members = members;
  }

  addMember(member: Member): void {
    this.members.push(member);
  }

  contains(member: Member): boolean {
    return this.members.includes(member);
  }
}

export default Group;
