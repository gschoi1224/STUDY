
def solution(bridge_length, weight, truck_weights):
    bridge = [0] * bridge_length
    time = 0

    while bridge:
        time += 1
        bridge.pop(0)   # 다리를 건너기

        if truck_weights:
            if truck_weights[0] + sum(bridge) <= weight:
                bridge.append(truck_weights.pop(0))
            else:
                bridge.append(0)

    return time

print(solution(2, 10, [7,4,5,6])) # 8
print(solution(100, 100, [10])) # 101
print(solution(100, 100, [10,10,10,10,10,10,10,10,10,10])) # 110