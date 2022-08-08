import { Set } from "immutable"

export enum Space {
  EMPTY,
  BLACK,
  WHITE,
}

type Color = Space.BLACK | Space.WHITE

export function opposite(space: Space) {
  if (space === Space.BLACK) return Space.WHITE
  if (space === Space.WHITE) return Space.BLACK
  return Space.EMPTY
}

function adjacents(coo: string): Set<string> {
  const [x, y] = getXY(coo)

  return Set.of(
    coordinate(x, y + 1),
    coordinate(x, y - 1),
    coordinate(x + 1, y),
    coordinate(x - 1, y)
  )
}

export function coordinate(x: number, y: number): string {
  return `${x},${y}`
}

function getXY(coo: string): [number, number] {
  const [x, y] = coo.split(",")

  return [+x, +y]
}

export default class Board {
  private prevBoard?: Board

  public constructor(
    public readonly size: number = 9,
    public readonly moves: Map<string, Color> = new Map()
  ) {}

  private clone(): Board {
    return new Board(this.size, new Map(this.moves))
  }

  private withMove(coo: string, color: Color): Board {
    this.moves.set(coo, color)

    return this
  }

  private contains(coo: string): boolean {
    const [x, y] = getXY(coo)

    return x >= 0 && y >= 0 && x < this.size && y < this.size
  }

  private space(coo: string): Space {
    return this.moves.get(coo) ?? Space.EMPTY
  }

  private isSpaceOccupied(coo: string): boolean {
    return this.moves.has(coo)
  }

  private adjacentCoordinates(coo: string): Set<string> {
    return adjacents(coo).filter((c) => this.contains(c))
  }

  private matchingAdjacentCoordinates(coo: string, space?: Space): Set<string> {
    const spaceToMatch = space ?? this.space(coo)

    return this.adjacentCoordinates(coo).filter(
      (c) => this.space(c) === spaceToMatch
    )
  }

  private group(coo: string): Set<string> {
    let found = Set<string>()
    let queue = Set([coo])

    while (!queue.isEmpty()) {
      const current = queue.first()!
      const matchingAdjacents = this.matchingAdjacentCoordinates(current)

      found = found.add(current)
      queue = queue.rest().union(matchingAdjacents.subtract(found))
    }

    return found
  }

  private liberties(coo: string): Set<string> {
    return this.group(coo).reduce(
      (acc, curr) =>
        acc.union(this.matchingAdjacentCoordinates(curr, Space.EMPTY)),
      Set<string>()
    )
  }

  private libertiesCount(coo: string): number {
    return this.liberties(coo).size
  }

  private is(board: Board): boolean {
    return (
      Set([...this.moves.keys()]).equals(Set([...board.moves.keys()])) &&
      [...this.moves].every((move) => board.moves.get(move[0]) === move[1])
    )
  }

  public willCauseKo(coo: string, color: Color): boolean {
    if (!this.prevBoard) return false

    return this.clone().moveAndCapture(coo, color).is(this.prevBoard)
  }

  private isLegalMove(coo: string, color: Color): boolean {
    if (this.isSpaceOccupied(coo)) return false

    const willHaveLiberties =
      this.clone().withMove(coo, color).libertiesCount(coo) > 0
    const willCapture = this.matchingAdjacentCoordinates(
      coo,
      opposite(color)
    ).some((c) => this.libertiesCount(c) === 1)

    return (willHaveLiberties || willCapture) && !this.willCauseKo(coo, color)
  }

  private remove(coo: string) {
    this.moves.delete(coo)
  }

  private removeGroup(coo: string) {
    this.group(coo).forEach((c) => this.remove(c))
  }

  private capture(coo: string, color: Color): Board {
    this.matchingAdjacentCoordinates(coo, opposite(color))
      .filter((c) => this.libertiesCount(c) === 1)
      .forEach((c) => this.removeGroup(c))

    return this
  }

  private moveAndCapture(coo: string, color: Color): Board {
    return this.capture(coo, color).withMove(coo, color)
  }

  public move(coo: string, color: Color): Board {
    if (!this.isLegalMove(coo, color)) {
      throw new Error("Not a valid position")
    }

    this.prevBoard = this.clone()

    return this.moveAndCapture(coo, color)
  }
}
