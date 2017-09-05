import mongoose from 'mongoose';

import {Schema} from './mongooseSchema.js';

const RiverSchema = new Schema({
    name         : {type: String, required: true},
    hydroPost    : {type: String, required: true},
    levelToday   : {type: Number, get: v => Math.round(v), set: v => Math.round(v), required: true},
    levelDelta   : {type: Number, get: v => Math.round(v), set: v => Math.round(v)},
    levelAPPG    : {type: Number, get: v => Math.round(v), set: v => Math.round(v)},
    typeRiver    : {type: String},                                                          // FIXME: определиться с необходимостью
    scalingDate  : {type: Date},
    criticalLevelPashtory: {type: Number, get: v => Math.round(v), set: v => Math.round(v), default: 901, required: true},
    criticalLevelTugiyany: {type: Number, get: v => Math.round(v), set: v => Math.round(v), default: 938, required: true},
    comment      : {type:String, default: 'Чисто'}
});

const River = mongoose.model('River', RiverSchema);
