def init_chart(lines, rows):
    station, lines, start, end = lines
    chart = [[0 for _ in range(station)] for _ in range(station)]

    # init the graph chart
    for item in rows:
        length = len(item)
        init_price, price, count_of_station = item[0], item[1], item[2]
        for start_station in range(3, length-1):
            for next_station in range(start_station+1, length):
                start_station_value = item[start_station]
                next_station_value = item[next_station]
                station_price = init_price + (next_station-start_station) * price
                chart[start_station_value - 1][next_station_value - 1] = station_price
                chart[next_station_value - 1][start_station_value - 1] = station_price

    # all the path from station to station
    for index in range(len(chart)):
        print(chart[index])

    if chart[start-1][end -1] != 0:
        return chart[start-1][end-1]

    start_ = chart[start-1]
    min_cost = -1

    # start station can arrive below station [3, 5]
    stations_start_trip = [start_.index(item) for item in start_ if item > 0]

    # check [3, 4] can arrive the end station, if not return -1
    for trips in stations_start_trip:
        cost = chart[trips][end - 1]
        if cost > 0:
            min_cost_for_trip = cost + start_[trips]
            if min_cost != -1:
                min_cost = min(min_cost_for_trip, min_cost)
            else:
                min_cost = min_cost_for_trip

    return min_cost


if __name__ == '__main__':
    line = [5, 2, 1, 4]
    rows = [[2, 2, 3, 1, 3, 5], [2, 1, 4, 2, 3, 4, 5]]
    print(init_chart(line, rows))
    
## output

[0, 0, 4, 0, 6]
[0, 0, 3, 4, 5]
[4, 3, 0, 3, 4]
[0, 4, 3, 0, 3]
[6, 5, 4, 3, 0]
7
