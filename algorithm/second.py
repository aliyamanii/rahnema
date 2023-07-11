class Challenge2:
    def waterhole(self, height: list[int]) -> int:
        n = len(height)
        left_max = [0] * n
        right_max = [0] * n

        # Maximum height from the left for each point
        left_max[0] = height[0]
        for i in range(1, n):
            left_max[i] = max(left_max[i - 1], height[i])

        # Maximum height from the right for each point
        right_max[n - 1] = height[n - 1]
        for i in range(n - 2, -1, -1):
            right_max[i] = max(right_max[i + 1], height[i])

        water_filled = 0

        # Amount of water filled in the puddles
        for i in range(n):
            water_filled += min(left_max[i], right_max[i]) - height[i]

        return water_filled

