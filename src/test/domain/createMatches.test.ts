import { CreateGroupsService, Group, Member } from "../../app/domain";

describe("test CreateMatchesService", () => {
  // TODO: we shouldn't need to do this null this
  let service: any = null;

  beforeEach(() => {
    const member1 = new Member("id", "first", "last", true, false);
    const member2 = new Member("id2", "first", "last", true, false);
    const member3 = new Member("id3", "first", "last", true, false);
    const member4 = new Member("id4", "first", "last", true, false);
    const member5 = new Member("id5", "first", "last", true, false);
    const member6 = new Member("id6", "first", "last", true, false);

    const group1 = new Group([member1, member2]);
    const group2 = new Group([member3, member4]);
    const group3 = new Group([member5, member6]);

    const members = [member1, member2, member3, member4, member5, member6];
    const previousGroups = [group1, group2, group3];

    service = new CreateGroupsService(members, previousGroups);
  });

  describe("test eligibleMatches", () => {
    it("should return all members if no previous matches", () => {
      const member1 = service.members[0];
      const membersNotMatchedWith = service.members.slice(2, 7);
      expect(service.eligibleMatches(member1)).toEqual(membersNotMatchedWith);
    });
  });

  describe("test matchedInPreviousRound", () => {
    it("should return true if member was matched in previous round", () => {
      const member1 = service.members[0];
      const member2 = service.members[1];
      expect(service.matchedInPreviousRound(member1, member2)).toBe(true);
    });

    it("should return false if member was not matched in previous round", () => {
      const member1 = service.members[0];
      const member3 = service.members[2];
      expect(service.matchedInPreviousRound(member1, member3)).toBe(false);
    });
  });
});
