const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '../.env') });

const StudentSchema = new mongoose.Schema({ fullName: String, user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' } });
const UserSchema = new mongoose.Schema({ email: String });
const DormApplicationSchema = new mongoose.Schema({ 
  student: mongoose.Schema.Types.ObjectId,
  assignedRoom: mongoose.Schema.Types.ObjectId,
  status: String
});
const RoomSchema = new mongoose.Schema({
  roomNumber: String,
  currentOccupants: Number,
  isFull: Boolean,
  assignedStudents: [mongoose.Schema.Types.ObjectId]
});
const TransactionSchema = new mongoose.Schema({
  student: mongoose.Schema.Types.ObjectId
});

async function resetStudent() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to DB');

    const User = mongoose.models.User || mongoose.model('User', UserSchema);
    const Student = mongoose.models.Student || mongoose.model('Student', StudentSchema);
    const DormApplication = mongoose.models.DormApplication || mongoose.model('DormApplication', DormApplicationSchema);
    const Room = mongoose.models.Room || mongoose.model('Room', RoomSchema);
    const Transaction = mongoose.models.Transaction || mongoose.model('Transaction', TransactionSchema);

    const email = 'bezawit.yeshewas-ug@aau.edu.et';
    const user = await User.findOne({ email: new RegExp(email, 'i') });
    
    if (!user) {
      console.log(`User with email "${email}" not found.`);
      return;
    }

    const student = await Student.findOne({ user: user._id });
    if (!student) {
      console.log(`Student record for user "${email}" not found.`);
      return;
    }

    console.log(`Found student: ${student.fullName} (${student._id})`);

    // 1. Delete all transactions
    const transResult = await Transaction.deleteMany({ student: student._id });
    console.log(`Deleted ${transResult.deletedCount} transactions.`);

    // 2. Find and delete application
    const app = await DormApplication.findOne({ student: student._id });
    if (app) {
      console.log(`Found application with status: ${app.status}`);
      
      // Clear room occupation
      if (app.assignedRoom) {
        const room = await Room.findById(app.assignedRoom);
        if (room) {
          room.currentOccupants = Math.max(0, (room.currentOccupants || 0) - 1);
          room.isFull = false;
          if (room.assignedStudents) {
            room.assignedStudents = room.assignedStudents.filter(id => id.toString() !== student._id.toString());
          }
          await room.save();
          console.log(`Removed student from room ${room.roomNumber}`);
        }
      }

      await DormApplication.deleteOne({ _id: app._id });
      console.log(`Deleted application.`);
    } else {
      console.log('No application found for this student.');
    }

  } catch (err) {
    console.error('Error:', err);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected');
  }
}

resetStudent();
