import { Group, Member } from "./entity";

class CreateMatchesService {
  // the members participating in this round of matches
  members: Member[];

  // the slice of previous group history to consider when matching users
  previousGroups: Group[];

  constructor(members: Member[], previousGroups: Group[]) {
    // TODO: consider pre-sorting members by last match date
    this.members = members;
    this.previousGroups = previousGroups;
  }

  createGroups(): Group[] {
    let groups: Group[] = [];

    // while there are still members to group
    while (this.members.length > 0) {
      const member = this.members.pop();

      if (!member) {
        throw new Error("Member unexpectedly undefined");
      }

      // if there are still other members to match, create a match
      if (this.members.length > 0) {
        const group = this.createGroup(member);
        groups.push(group);
      }

      // if there are no other members to group, match with a staff member
      if (this.members.length === 0) {
        const group = this.createGroupWithStaff(member);
        groups.push(group);
      }
    }

    // once all groups are created, return them
    return groups;
  }

  createGroup(member: Member): Group {
    const group = new Group([member, this.findMatch(member)]);
    return group;
  }

  createGroupWithStaff(member: Member): Group {
    const group = new Group([member, this.findStaffMember()]);
    return group;
  }

  findStaffMember(): Member {
    const staffMembers = this.members.filter((m) => m.staff);

    if (staffMembers.length === 0) {
      throw new Error("No staff members found");
    }

    return staffMembers[Math.floor(Math.random() * staffMembers.length)];
  }

  findMatch(member: Member): Member {
    const eligibleMembers = this.eligibleMembers(member);
    return eligibleMembers[Math.floor(Math.random() * eligibleMembers.length)];
  }

  eligibleMembers(member: Member): Member[] {
    return this.members.filter(
      (m) => m !== member && !this.matchedInPreviousRound(member, m)
    );
  }

  matchedInPreviousRound(memberOne: Member, memberTwo: Member): boolean {
    return this.previousGroups.some(
      (group) => group.contains(memberOne) && group.contains(memberTwo)
    );
  }
}

export default CreateMatchesService;
