// @ts-nocheck
import { Set } from "immutable"
import Board, { coordinate, opposite, Space } from "./board"

describe("adjacentCoordinates", () => {
  it("yields the correct 4 when coordinate is in center", () => {
    const board = new Board(19)

    expect(
      board
        .adjacentCoordinates(coordinate(9, 9))
        .equals(
          Set.of(
            coordinate(9, 8),
            coordinate(9, 10),
            coordinate(8, 9),
            coordinate(10, 9)
          )
        )
    ).toBeTruthy()
  })

  it("yields the correct 3 when coordinate is on side", () => {
    const board = new Board(19)

    expect(
      board
        .adjacentCoordinates(coordinate(0, 9))
        .equals(Set.of(coordinate(0, 8), coordinate(0, 10), coordinate(1, 9)))
    ).toBeTruthy()
  })

  it("yields the correct 2 when coordinate is corner", () => {
    const board = new Board(19)

    expect(
      board
        .adjacentCoordinates(coordinate(18, 18))
        .equals(Set.of(coordinate(18, 17), coordinate(17, 18)))
    ).toBeTruthy()
  })
})

describe("matchingAdjacentCoordinates", () => {
  const board = new Board(19)
    .move(coordinate(9, 8), Space.BLACK)
    .move(coordinate(9, 10), Space.WHITE)
    .move(coordinate(8, 9), Space.WHITE)

  it("yields correct matches for white", () => {
    expect(
      board
        .matchingAdjacentCoordinates(coordinate(9, 9), Space.WHITE)
        .equals(Set.of(coordinate(9, 10), coordinate(8, 9)))
    ).toBeTruthy()
  })

  it("yields correct matches for black", () => {
    expect(
      board
        .matchingAdjacentCoordinates(coordinate(9, 9), Space.BLACK)
        .equals(Set.of(coordinate(9, 8)))
    ).toBeTruthy()
  })

  it("yields correct matches for empty", () => {
    expect(
      board
        .matchingAdjacentCoordinates(coordinate(9, 9), Space.EMPTY)
        .equals(Set.of(coordinate(10, 9)))
    ).toBeTruthy()
  })
})

describe("group", () => {
  it("finds a group of 1", () => {
    const board = new Board(5).move(coordinate(2, 2), Space.BLACK)

    expect(
      board.group(coordinate(2, 2)).equals(Set.of(coordinate(2, 2)))
    ).toBeTruthy()
  })

  it("finds a group of 2", () => {
    const board = new Board(5)
      .move(coordinate(2, 2), Space.BLACK)
      .move(coordinate(2, 1), Space.BLACK)

    expect(
      board
        .group(coordinate(2, 2))
        .equals(Set.of(coordinate(2, 2), coordinate(2, 1)))
    ).toBeTruthy()
  })

  it("finds a group of 1 with adjacent opposite color", () => {
    const board = new Board(5)
      .move(coordinate(2, 2), Space.BLACK)
      .move(coordinate(2, 1), Space.WHITE)

    expect(
      board.group(coordinate(2, 2)).equals(Set.of(coordinate(2, 2)))
    ).toBeTruthy()
  })

  it("finds empty triangle", () => {
    const board = new Board(5)
      .move(coordinate(2, 2), Space.BLACK)
      .move(coordinate(2, 1), Space.BLACK)
      .move(coordinate(1, 2), Space.BLACK)

    expect(
      board
        .group(coordinate(2, 2))
        .equals(Set.of(coordinate(2, 2), coordinate(2, 1), coordinate(1, 2)))
    ).toBeTruthy()
  })
})

describe("opposite", () => {
  it("returns opposite of black", () => {
    expect(opposite(Space.BLACK)).toBe(Space.WHITE)
  })

  it("returns opposite of white", () => {
    expect(opposite(Space.WHITE)).toBe(Space.BLACK)
  })

  it("returns empty for empty", () => {
    expect(opposite(Space.EMPTY)).toBe(Space.EMPTY)
  })
})

describe("liberties and libertiesCount", () => {
  it("find values for 1 stone", () => {
    const board = new Board(5).move(coordinate(2, 2), Space.BLACK)

    expect(
      board
        .liberties(coordinate(2, 2))
        .equals(
          Set.of(
            coordinate(2, 1),
            coordinate(1, 2),
            coordinate(2, 3),
            coordinate(3, 2)
          )
        )
    ).toBeTruthy()
    expect(board.libertiesCount(coordinate(2, 2))).toBe(4)
  })

  it("find values for group of 2", () => {
    const board = new Board(5)
      .move(coordinate(2, 2), Space.BLACK)
      .move(coordinate(2, 1), Space.BLACK)

    expect(
      board
        .liberties(coordinate(2, 2))
        .equals(
          Set.of(
            coordinate(1, 2),
            coordinate(2, 3),
            coordinate(3, 2),
            coordinate(2, 0),
            coordinate(1, 1),
            coordinate(3, 1)
          )
        )
    ).toBeTruthy()
    expect(board.libertiesCount(coordinate(2, 2))).toBe(6)
  })

  it("properly decrement liberty with opposite color adjacent", () => {
    const board = new Board(5)
      .move(coordinate(2, 2), Space.BLACK)
      .move(coordinate(2, 1), Space.WHITE)

    expect(
      board
        .liberties(coordinate(2, 2))
        .equals(Set.of(coordinate(1, 2), coordinate(2, 3), coordinate(3, 2)))
    ).toBeTruthy()
    expect(board.libertiesCount(coordinate(2, 2))).toBe(3)
  })

  it("count shared liberties in empty triangle", () => {
    const board = new Board(5)
      .move(coordinate(2, 2), Space.BLACK)
      .move(coordinate(2, 1), Space.BLACK)
      .move(coordinate(3, 2), Space.BLACK)

    expect(
      board
        .liberties(coordinate(2, 2))
        .equals(
          Set.of(
            coordinate(1, 2),
            coordinate(2, 3),
            coordinate(4, 2),
            coordinate(2, 0),
            coordinate(1, 1),
            coordinate(3, 1),
            coordinate(3, 3)
          )
        )
    ).toBeTruthy()
    expect(board.libertiesCount(coordinate(2, 2))).toBe(7)
  })
})

describe("isLegalMove", () => {
  it("identifies suicide moves as invalid", () => {
    const board = new Board(3)
      .move(coordinate(1, 0), Space.BLACK)
      .move(coordinate(0, 1), Space.BLACK)
      .move(coordinate(2, 1), Space.BLACK)
      .move(coordinate(1, 2), Space.BLACK)

    expect(board.isLegalMove(coordinate(1, 1), Space.WHITE)).toBeFalsy()
  })

  it("allows filling in a ponnuki", () => {
    const board = new Board(3)
      .move(coordinate(1, 0), Space.BLACK)
      .move(coordinate(0, 1), Space.BLACK)
      .move(coordinate(2, 1), Space.BLACK)
      .move(coordinate(1, 2), Space.BLACK)

    expect(board.isLegalMove(coordinate(1, 1), Space.BLACK)).toBeTruthy()
  })

  it("marks suicide in corner as invalid", () => {
    const board = new Board(3)
      .move(coordinate(2, 0), Space.BLACK)
      .move(coordinate(2, 1), Space.BLACK)
      .move(coordinate(1, 2), Space.BLACK)

    expect(board.isLegalMove(coordinate(2, 2), Space.WHITE)).toBeFalsy()
  })

  it("marks suicide in corner that kills first as valid", () => {
    const board = new Board(9)
      .move(coordinate(0, 0), Space.BLACK)
      .move(coordinate(2, 0), Space.BLACK)
      .move(coordinate(1, 1), Space.BLACK)
      .move(coordinate(0, 1), Space.WHITE)
      .move(coordinate(1, 0), Space.WHITE)

    expect(board.space(coordinate(0, 0))).toBe(Space.EMPTY)
  })

  it("marks ko as invalid", () => {
    const board = new Board(9)
      .move(coordinate(2, 0), Space.BLACK)
      .move(coordinate(1, 0), Space.WHITE)
      .move(coordinate(1, 1), Space.BLACK)
      .move(coordinate(0, 1), Space.WHITE)
      .move(coordinate(0, 0), Space.BLACK)

    expect(board.isLegalMove(coordinate(1, 0), Space.WHITE)).toBeFalsy()
  })

  it("allows to capture after ko threat", () => {
    const board = new Board(9)
      .move(coordinate(2, 0), Space.BLACK)
      .move(coordinate(1, 0), Space.WHITE)
      .move(coordinate(1, 1), Space.BLACK)
      .move(coordinate(0, 1), Space.WHITE)
      .move(coordinate(0, 0), Space.BLACK)
      .move(coordinate(1, 2), Space.WHITE)
      .move(coordinate(2, 2), Space.BLACK)

    expect(board.isLegalMove(coordinate(1, 0), Space.WHITE)).toBeTruthy()

    board.move(coordinate(1, 0), Space.WHITE)

    expect(board.isLegalMove(coordinate(0, 0), Space.BLACK)).toBeFalsy()
  })
})

describe("remove", () => {
  it("can remove a specified stone", () => {
    const board = new Board(19).move(coordinate(9, 9), Space.BLACK)

    board.remove(coordinate(9, 9))

    expect(board.space(coordinate(9, 9))).toBe(Space.EMPTY)
  })

  it("does not blow up even if a coordinate is not there", () => {
    const board = new Board(19)

    board.remove(coordinate(9, 9))

    expect(board.space(coordinate(9, 9))).toBe(Space.EMPTY)
  })
})

describe("removeGroup", () => {
  it("can remove a bunch of stones", () => {
    const board = new Board(9)
      .move(coordinate(7, 7), Space.BLACK)
      .move(coordinate(1, 2), Space.WHITE)
      .move(coordinate(7, 8), Space.BLACK)
      .move(coordinate(3, 7), Space.WHITE)
      .move(coordinate(1, 7), Space.BLACK)

    board.removeGroup(coordinate(7, 7))
    board.removeGroup(coordinate(1, 7))
    board.removeGroup(coordinate(3, 7))

    expect(board.space(coordinate(7, 7))).toBe(Space.EMPTY)
    expect(board.space(coordinate(1, 7))).toBe(Space.EMPTY)
    expect(board.space(coordinate(3, 7))).toBe(Space.EMPTY)
    expect(board.space(coordinate(1, 2))).toBe(Space.WHITE)
    expect(board.space(coordinate(7, 8))).toBe(Space.EMPTY)
  })
})

describe("move", () => {
  it("adds a move to simple empty board", () => {
    const board = new Board(19)

    board.move(coordinate(9, 9), Space.BLACK)

    expect(board.space(coordinate(9, 9))).toBe(Space.BLACK)
  })

  it("throws if adding same move twice", () => {
    const board = new Board(19).move(coordinate(9, 9), Space.BLACK)

    expect(() => {
      board.move(coordinate(9, 9), Space.WHITE)
    }).toThrow()
  })
})
