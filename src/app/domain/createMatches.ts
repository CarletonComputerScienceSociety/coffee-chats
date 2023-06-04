import { Match, Member } from "./entity";

class CreateMatchesService {
  // the members participating in this round of matches
  members: Member[];

  // the slice of previous match history to consider when creating matches
  previousMatches: Match[];

  constructor(members: Member[], previousMatches: Match[]) {
    // TODO: consider pre-sorting members by last match date
    this.members = members;
    this.previousMatches = previousMatches;
  }

  createMatches(): Match[] {
    let matches: Match[] = [];

    // while there are still members to match
    while (this.members.length > 0) {
      const member = this.members.pop();

      if (!member) {
        throw new Error("Member unexpectedly undefined");
      }

      // if there are still other members to match, create a match
      if (this.members.length > 0) {
        const match = this.createMatch(member);
        matches.push(match);
      }

      // if there are no other members to match, match with a staff member
      if (this.members.length === 0) {
        const match = this.createMatchWithStaff(member);
        matches.push(match);
      }
    }

    // once all matches are created, return them
    return matches;
  }

  createMatch(member: Member): Match {
    const match = new Match(member, this.findMatch(member));
    return match;
  }

  createMatchWithStaff(member: Member): Match {
    const match = new Match(member, this.findStaffMember());
    return match;
  }

  findStaffMember(): Member {
    const staffMembers = this.members.filter((m) => m.staff);

    if (staffMembers.length === 0) {
      throw new Error("No staff members found");
    }

    return staffMembers[Math.floor(Math.random() * staffMembers.length)];
  }

  findMatch(member: Member): Member {
    const eligibleMatches = this.eligibleMatches(member);
    return eligibleMatches[Math.floor(Math.random() * eligibleMatches.length)];
  }

  eligibleMatches(member: Member): Member[] {
    return this.members.filter(
      (m) => m !== member && !this.matchedInPreviousRound(member, m)
    );
  }

  matchedInPreviousRound(memberOne: Member, memberTwo: Member): boolean {
    return this.previousMatches.some(
      (match) => match.contains(memberOne) && match.contains(memberTwo)
    );
  }
}

export default CreateMatchesService;
