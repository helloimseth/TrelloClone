# write some jbuilder to return some json about a board
# it should include the board
#  - its lists
#    - the cards for each list
json.(@board, :title, :updated_at)

json.lists @board.lists, :id, :title, :ord, :cards
