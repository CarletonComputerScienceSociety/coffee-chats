import { Match, Member } from "../../../app/domain/entity";

describe("test Match entity", () => {
  it("should contain member who was a part of the match", () => {
    const member1 = new Member("id", "first", "last", true, false);
    const member2 = new Member("id2", "first", "last", true, false);
    const match = new Match(member1, member2);

    expect(match.contains(member1)).toBe(true);
  });

  it("should not contain member who was not a part of the match", () => {
    const member1 = new Member("id", "first", "last", true, false);
    const member2 = new Member("id2", "first", "last", true, false);
    const member3 = new Member("id3", "first", "last", true, false);
    const match = new Match(member1, member2);

    expect(match.contains(member3)).toBe(false);
  });
});
