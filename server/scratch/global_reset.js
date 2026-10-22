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

async function resetEverything() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to DB');

        const User = mongoose.models.User || mongoose.model('User', UserSchema);
        const Student = mongoose.models.Student || mongoose.model('Student', StudentSchema);
        const DormApplication = mongoose.models.DormApplication || mongoose.model('DormApplication', DormApplicationSchema);
        const Room = mongoose.models.Room || mongoose.model('Room', RoomSchema);
        const Transaction = mongoose.models.Transaction || mongoose.model('Transaction', TransactionSchema);

        // 1. Delete ALL applications
        const appDel = await DormApplication.deleteMany({});
        console.log(`Deleted ${appDel.deletedCount} dorm applications.`);

        // 2. Delete ALL transactions
        const transDel = await Transaction.deleteMany({});
        console.log(`Deleted ${transDel.deletedCount} transactions.`);

        // 3. Reset ALL rooms
        const roomUpdate = await Room.updateMany({}, {
            $set: {
                currentOccupants: 0,
                isFull: false,
                assignedStudents: []
            }
        });
        console.log(`Reset ${roomUpdate.modifiedCount} rooms to empty status.`);

        console.log('\n✅ GLOBAL RESET COMPLETE. The system is now a clean slate for testing.');

    } catch (err) {
        console.error('Error during reset:', err);
    } finally {
        await mongoose.disconnect();
        console.log('Disconnected');
    }
}

resetEverything();
