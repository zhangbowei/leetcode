function minPathSum( grid ) {
    // write code here
    let row = grid[0].length;
    let col = grid.length;
    let dp = [];

    for(let i = 0; i < col; ++i) {
        dp[i] = [];

        for(let j = 0; j < row; ++j) {
            let left, right, mid;

            if (i-1 < 0) {
                left = Infinity;
            } else {
                left = dp[i-1][j];
            }

            if (j-1 < 0) {
                right = Infinity;
            } else {
                right = dp[i][j-1];
            }

            if (left < right) {
                mid = left;
            } else {
                mid = right;
            }

            dp[i][j] = mid + grid[i][j];

            if (i === 0 && j === 0) {
                dp[i][j] = grid[0][0];
            }
        }
    }

    return dp[col-1][row-1];
}

minPathSum([[1,2],[5,6],[1,1]]);