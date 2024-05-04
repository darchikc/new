import React, { useState } from 'react'; 
import { StatusBar } from 'expo-status-bar'; 
import { FlatList, StyleSheet, Text, TouchableOpacity, View, Button } from 'react-native'; 
 
export default function App() { 
  const [notification, setNotification] = useState("Player 0's turn"); 
  const [board, setBoard] = useState(Array(9).fill(" ")); 
  const [score, setScore] = useState({ X: 0, O: 0 }); 
 
  const handleCellPress = (index) => { 
    if (board[index] === " ") { 
      const newBoard = [...board]; 
      const currentPlayer = getCurrentPlayer(); 
      newBoard[index] = currentPlayer; 
      setBoard(newBoard); 
 
      const winner = calculateWinner(newBoard); 
      if (winner) { 
        setNotification(`Player ${winner} wins!`); 
        setScore({ ...score, [winner]: score[winner] + 1 }); 
      } else if (newBoard.every(cell => cell !== " ")) { 
        setNotification("It's a tie!"); 
      } else { 
        setNotification(`Player ${currentPlayer === "X" ? "O" : "X"}'s turn`); 
      } 
    } 
  }; 
 
  const getCurrentPlayer = () => { 
    const xCount = board.filter(cell => cell === 'X').length; 
    const oCount = board.filter(cell => cell === 'O').length; 
    return xCount === oCount ? 'X' : 'O'; 
  }; 
 
  const calculateWinner = (board) => { 
    const lines = [ 
      [0, 1, 2], 
      [3, 4, 5], 
      [6, 7, 8], 
      [0, 3, 6], 
      [1, 4, 7], 
      [2, 5, 8], 
      [0, 4, 8], 
      [2, 4, 6], 
    ]; 
    for (let i = 0; i < lines.length; i++) { 
      const [a, b, c] = lines[i]; 
      if (board[a] && board[a] === board[b] && board[a] === board[c]) { 
        return board[a]; 
      } 
    } 
    return null; 
  }; 
 
  const restartGame = () => { 
    setNotification("Player 0's turn"); 
    setBoard(Array(9).fill(" ")); 
  }; 
 
  const renderCell = ({ item, index }) => ( 
    <TouchableOpacity 
      style={styles.boardCell} 
      onPress={() => handleCellPress(index)} 
    > 
      <Text style={styles.cellText}>{item}</Text> 
    </TouchableOpacity> 
  ); 
 
  return ( 
    <View style={styles.container}> 
      <Text style={styles.gameTitle}>Tic Tac Toe</Text> 
      <View style={styles.scoreContainer}> 
        <Text style={styles.scoreText}>X: {score.X}</Text> 
        <Text style={styles.scoreText}>O: {score.O}</Text> 
      </View> 
      <View style={styles.notificationContainer}> 
        <Text style={styles.notificationText}>{notification}</Text> 
      </View> 
      <FlatList 
        style={styles.list} 
        data={board} 
        numColumns={3} 
        renderItem={renderCell} 
        keyExtractor={(item, index) => index.toString()} 
      /> 
      <View style={styles.restartButtonContainer}> 
        <Button title="Restart" onPress={restartGame} /> 
      </View> 
      <StatusBar style="auto" /> 
    </View> 
  ); 
} 
 
const styles = StyleSheet.create({ 
  container: { 
    flex: 1, 
    backgroundColor: '#fff', 
    alignItems: 'center', 
  }, 
  gameTitle: { 
    marginTop: 70, 
    fontSize: 24, 
    fontWeight: 'bold', 
    color: 'red', 
  }, 
  scoreContainer: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    width: '100%', 
    paddingHorizontal: 20, 
    marginTop: 10, 
  }, 
  scoreText: { 
    fontSize: 18, 
  }, 
  notificationContainer: { 
    marginTop: 20, 
    padding: 10, 
    backgroundColor: 'lightgray', 
    borderRadius: 5, 
  }, 
  notificationText: { 
    fontSize: 18, 
  }, 
  list: { 
    width: 300, 
    height: 300, 
    marginTop: 20, 
  }, 
  boardCell: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    borderWidth: 1, 
    borderColor: 'black', 
    height: 100, 
  }, 
  cellText: { 
    fontSize: 36, 
  }, 
  restartButtonContainer: { 
    marginTop: 20, 
  }, 
});


/*dvfdgsdvsdfg*/