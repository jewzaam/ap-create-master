var P = new ImageCalibration;
P.targetFrames = [ // enabled, path
   [true, "D:/DropboxParent/Dropbox/Family Room/Astrophotography/RAW/FLAT/SQA55+ASCOM.ToupTek.Camera/DATE_2026-01-15_INSTRUME_ATR585M_OFFSET_150_READOUTM_Low Conversion Gain/FILTER_B_EXP_1.36_SETTEMP_-10.00/2026-01-16_07-06-23_HFR__RMSAC_0.00_TEMP_-9.90.fits"],
   [true, "D:/DropboxParent/Dropbox/Family Room/Astrophotography/RAW/FLAT/SQA55+ASCOM.ToupTek.Camera/DATE_2026-01-15_INSTRUME_ATR585M_OFFSET_150_READOUTM_Low Conversion Gain/FILTER_B_EXP_1.37_SETTEMP_-10.00/2026-01-16_07-06-20_HFR__RMSAC_0.00_TEMP_-10.00.fits"],
   [true, "D:/DropboxParent/Dropbox/Family Room/Astrophotography/RAW/FLAT/SQA55+ASCOM.ToupTek.Camera/DATE_2026-01-15_INSTRUME_ATR585M_OFFSET_150_READOUTM_Low Conversion Gain/FILTER_B_EXP_1.39_SETTEMP_-10.00/2026-01-16_07-06-17_HFR__RMSAC_0.00_TEMP_-9.90.fits"],
   [true, "D:/DropboxParent/Dropbox/Family Room/Astrophotography/RAW/FLAT/SQA55+ASCOM.ToupTek.Camera/DATE_2026-01-15_INSTRUME_ATR585M_OFFSET_150_READOUTM_Low Conversion Gain/FILTER_B_EXP_1.40_SETTEMP_-10.00/2026-01-16_07-06-14_HFR__RMSAC_0.00_TEMP_-10.00.fits"],
   [true, "D:/DropboxParent/Dropbox/Family Room/Astrophotography/RAW/FLAT/SQA55+ASCOM.ToupTek.Camera/DATE_2026-01-15_INSTRUME_ATR585M_OFFSET_150_READOUTM_Low Conversion Gain/FILTER_B_EXP_1.42_SETTEMP_-10.00/2026-01-16_07-06-11_HFR__RMSAC_0.00_TEMP_-10.00.fits"],
   [true, "D:/DropboxParent/Dropbox/Family Room/Astrophotography/RAW/FLAT/SQA55+ASCOM.ToupTek.Camera/DATE_2026-01-15_INSTRUME_ATR585M_OFFSET_150_READOUTM_Low Conversion Gain/FILTER_B_EXP_1.43_SETTEMP_-10.00/2026-01-16_07-06-08_HFR__RMSAC_0.00_TEMP_-10.00.fits"],
   [true, "D:/DropboxParent/Dropbox/Family Room/Astrophotography/RAW/FLAT/SQA55+ASCOM.ToupTek.Camera/DATE_2026-01-15_INSTRUME_ATR585M_OFFSET_150_READOUTM_Low Conversion Gain/FILTER_B_EXP_1.45_SETTEMP_-10.00/2026-01-16_07-06-05_HFR__RMSAC_0.00_TEMP_-9.90.fits"],
   [true, "D:/DropboxParent/Dropbox/Family Room/Astrophotography/RAW/FLAT/SQA55+ASCOM.ToupTek.Camera/DATE_2026-01-15_INSTRUME_ATR585M_OFFSET_150_READOUTM_Low Conversion Gain/FILTER_B_EXP_1.46_SETTEMP_-10.00/2026-01-16_07-06-02_HFR__RMSAC_0.00_TEMP_-9.90.fits"],
   [true, "D:/DropboxParent/Dropbox/Family Room/Astrophotography/RAW/FLAT/SQA55+ASCOM.ToupTek.Camera/DATE_2026-01-15_INSTRUME_ATR585M_OFFSET_150_READOUTM_Low Conversion Gain/FILTER_B_EXP_1.48_SETTEMP_-10.00/2026-01-16_07-05-59_HFR__RMSAC_0.00_TEMP_-9.90.fits"],
   [true, "D:/DropboxParent/Dropbox/Family Room/Astrophotography/RAW/FLAT/SQA55+ASCOM.ToupTek.Camera/DATE_2026-01-15_INSTRUME_ATR585M_OFFSET_150_READOUTM_Low Conversion Gain/FILTER_B_EXP_1.49_SETTEMP_-10.00/2026-01-16_07-05-55_HFR__RMSAC_0.00_TEMP_-9.90.fits"], // row 10
   [true, "D:/DropboxParent/Dropbox/Family Room/Astrophotography/RAW/FLAT/SQA55+ASCOM.ToupTek.Camera/DATE_2026-01-15_INSTRUME_ATR585M_OFFSET_150_READOUTM_Low Conversion Gain/FILTER_B_EXP_1.51_SETTEMP_-10.00/2026-01-16_07-05-52_HFR__RMSAC_0.00_TEMP_-9.90.fits"],
   [true, "D:/DropboxParent/Dropbox/Family Room/Astrophotography/RAW/FLAT/SQA55+ASCOM.ToupTek.Camera/DATE_2026-01-15_INSTRUME_ATR585M_OFFSET_150_READOUTM_Low Conversion Gain/FILTER_B_EXP_1.53_SETTEMP_-10.00/2026-01-16_07-05-49_HFR__RMSAC_0.00_TEMP_-9.90.fits"],
   [true, "D:/DropboxParent/Dropbox/Family Room/Astrophotography/RAW/FLAT/SQA55+ASCOM.ToupTek.Camera/DATE_2026-01-15_INSTRUME_ATR585M_OFFSET_150_READOUTM_Low Conversion Gain/FILTER_B_EXP_1.55_SETTEMP_-10.00/2026-01-16_07-05-46_HFR__RMSAC_0.00_TEMP_-9.90.fits"],
   [true, "D:/DropboxParent/Dropbox/Family Room/Astrophotography/RAW/FLAT/SQA55+ASCOM.ToupTek.Camera/DATE_2026-01-15_INSTRUME_ATR585M_OFFSET_150_READOUTM_Low Conversion Gain/FILTER_B_EXP_1.57_SETTEMP_-10.00/2026-01-16_07-05-43_HFR__RMSAC_0.00_TEMP_-9.90.fits"],
   [true, "D:/DropboxParent/Dropbox/Family Room/Astrophotography/RAW/FLAT/SQA55+ASCOM.ToupTek.Camera/DATE_2026-01-15_INSTRUME_ATR585M_OFFSET_150_READOUTM_Low Conversion Gain/FILTER_B_EXP_1.69_SETTEMP_-10.00/2026-01-16_07-05-40_HFR__RMSAC_0.00_TEMP_-9.90.fits"]
];
P.enableCFA = false;
P.cfaPattern = ImageCalibration.prototype.Auto;
P.inputHints = "fits-keywords normalize only-first-image raw cfa use-roworder-keywords signed-is-physical";
P.outputHints = "properties fits-keywords no-compress-data block-alignment 4096 max-inline-block-size 3072 no-embedded-data no-resolution";
P.pedestal = 0;
P.pedestalMode = ImageCalibration.prototype.Keyword;
P.pedestalKeyword = "";
P.overscanEnabled = false;
P.overscanImageX0 = 0;
P.overscanImageY0 = 0;
P.overscanImageX1 = 0;
P.overscanImageY1 = 0;
P.overscanRegions = [ // enabled, sourceX0, sourceY0, sourceX1, sourceY1, targetX0, targetY0, targetX1, targetY1
   [false, 0, 0, 0, 0, 0, 0, 0, 0],
   [false, 0, 0, 0, 0, 0, 0, 0, 0],
   [false, 0, 0, 0, 0, 0, 0, 0, 0],
   [false, 0, 0, 0, 0, 0, 0, 0, 0]
];
P.masterBiasEnabled = true;
P.masterBiasPath = "D:/DropboxParent/Dropbox/Family Room/Astrophotography/Data/_Bias Library/ATR585M/masterBias_EXPOSURE_0.00_SETTEMP_-10.00_GAIN_239_OFFSET_150_READOUTM_Low Conversion Gain.xisf";
P.masterDarkEnabled = true;
P.masterDarkPath = "D:/DropboxParent/Dropbox/Family Room/Astrophotography/Data/_Dark Library/ATR585M/masterDark_EXPOSURE_1.50_SETTEMP_-10.00_GAIN_239_OFFSET_150_READOUTM_Low Conversion Gain.xisf";
P.masterFlatEnabled = false;
P.masterFlatPath = "";
P.calibrateBias = true;
P.calibrateDark = true;
P.calibrateFlat = false;
P.optimizeDarks = true;
P.darkOptimizationThreshold = 0.00000;
P.darkOptimizationLow = 3.0000;
P.darkOptimizationWindow = 0;
P.darkCFADetectionMode = ImageCalibration.prototype.DetectCFA;
P.separateCFAFlatScalingFactors = false;
P.flatScaleClippingFactor = 0.05;
P.cosmeticCorrectionLow = false;
P.cosmeticLowSigma = 5;
P.cosmeticCorrectionHigh = false;
P.cosmeticHighSigma = 10;
P.cosmeticKernelRadius = 1;
P.cosmeticShowMap = false;
P.cosmeticShowMapAndStop = false;
P.evaluateNoise = false;
P.noiseEvaluationAlgorithm = ImageCalibration.prototype.NoiseEvaluation_MRS;
P.evaluateSignal = false;
P.structureLayers = 5;
P.saturationThreshold = 1.00;
P.saturationRelative = false;
P.noiseLayers = 1;
P.hotPixelFilterRadius = 1;
P.noiseReductionFilterRadius = 0;
P.minStructureSize = 0;
P.psfType = ImageCalibration.prototype.PSFType_Moffat4;
P.psfGrowth = 1.00;
P.maxStars = 24576;
P.outputDirectory = "D:/WBPP/_calibration/flat/calibrated/Flat_BIN-1_3840x2160_FILTER-B_mono_INSTRUME-ATR585M_DATE-2026-01-15_SETTEMP--10.00_OFFSET-150_GAIN-239_READOUTM-Low Conversion Gain";
P.outputExtension = ".xisf";
P.outputPrefix = "";
P.outputPostfix = "_c";
P.outputSampleFormat = ImageCalibration.prototype.f32;
P.outputPedestal = 0;
P.outputPedestalMode = ImageCalibration.prototype.OutputPedestal_Literal;
P.autoPedestalLimit = 0.00010;
P.generateHistoryProperties = true;
P.generateFITSKeywords = true;
P.overwriteExistingFiles = false;
P.onError = ImageCalibration.prototype.Continue;
P.noGUIMessages = true;
P.useFileThreads = true;
P.fileThreadOverload = 1.00;
P.maxFileReadThreads = 0;
P.maxFileWriteThreads = 0;
/*
 * Read-only properties
 *
P.outputData = [ // outputFilePath, darkScalingFactorRK, darkScalingFactorG, darkScalingFactorB, psfTotalFluxEstimateRK, psfTotalFluxEstimateG, psfTotalFluxEstimateB, psfTotalPowerFluxEstimateRK, psfTotalPowerFluxEstimateG, psfTotalPowerFluxEstimateB, psfTotalMeanFluxEstimateRK, psfTotalMeanFluxEstimateG, psfTotalMeanFluxEstimateB, psfTotalMeanPowerFluxEstimateRK, psfTotalMeanPowerFluxEstimateG, psfTotalMeanPowerFluxEstimateB, psfMStarEstimateRK, psfMStarEstimateG, psfMStarEstimateB, psfNStarEstimateRK, psfNStarEstimateG, psfNStarEstimateB, psfCountRK, psfCountG, psfCountB, noiseEstimateRK, noiseEstimateG, noiseEstimateB, noiseFractionRK, noiseFractionG, noiseFractionB, noiseScaleLowRK, noiseScaleLowG, noiseScaleLowB, noiseScaleHighRK, noiseScaleHighG, noiseScaleHighB, noiseAlgorithmRK, noiseAlgorithmG, noiseAlgorithmB, cosmeticCorrectionLowCountRK, cosmeticCorrectionLowCountG, cosmeticCorrectionLowCountB, cosmeticCorrectionHighCountRK, cosmeticCorrectionHighCountG, cosmeticCorrectionHighCountB
];
P.cosmeticCorrectionMapId = "";
 */
