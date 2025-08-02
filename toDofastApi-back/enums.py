import enum


class Difficulty(enum.Enum):
    easy = 'easy'
    medium = 'medium'
    hard = 'hard'
    very_hard = 'very hard'


class Status(enum.Enum):
    todo = 'to do'
    in_progress = 'in-progress'
    done = 'done'
