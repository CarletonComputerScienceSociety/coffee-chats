import { Member } from ".";

class Match {
  memberOne: Member;
  memberTwo: Member;

  constructor(memberOne: Member, memberTwo: Member) {
    this.memberOne = memberOne;
    this.memberTwo = memberTwo;
  }

  contains(member: Member): boolean {
    return this.memberOne === member || this.memberTwo === member;
  }
}

export default Match;
