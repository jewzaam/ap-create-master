# Master Calibration Frame Automation for PixInsight

Fully automated generation of master bias, dark, and flat calibration frames using saved process icons and WBPP optimize darks functionality.

## Overview

This automation tool:
- Generates master bias frames using a saved integration process icon
- Generates master dark frames using a saved integration process icon  
- Generates master flat frames using a saved integration process icon, with automatic dark optimization per filter (via ImageCalibration with optimize enabled)
- Runs completely hands-off from the command line
- Processes all filters automatically without manual intervention

## Requirements

- PixInsight installed
- Saved process icons for:
  - Bias integration (ImageIntegration with your preferred settings)
  - Dark integration (ImageIntegration with your preferred settings)
  - Flat integration (ImageIntegration with your preferred settings) - optional
- Organized calibration frames in subdirectories:
  ```
  input_directory/
    ├── bias/     (bias frames)
    ├── darks/    (dark frames)
    └── flats/    (flat frames, can be grouped by filter)
  ```

## Quick Start

### 1. Prepare Process Icons

In PixInsight:
1. Configure ImageIntegration with your preferred settings for bias frames
2. Save as a process icon (drag to workspace or save as .psm file)
3. Repeat for dark frames
4. Repeat for flat frames (optional - script will use defaults if not provided)

### 2. Organize Your Frames

Ensure your calibration frames are in subdirectories:
- `bias/` - bias frames
- `darks/` - dark frames  
- `flats/` - flat frames (will be automatically grouped by filter)

### 3. Run the Automation

**Windows:**
```batch
calibrate-masters.bat <input_dir> <output_dir> <bias_icon> <dark_icon> [flat_icon]
```

**Linux/Mac:**
```bash
./calibrate-masters.sh <input_dir> <output_dir> <bias_icon> <dark_icon> [flat_icon]
```

**Example:**
```batch
calibrate-masters.bat "D:\AstroData\M31\frames" "D:\AstroData\M31\masters" "bias_integration.psm" "dark_integration.psm" "flat_integration.psm"
```

## Configuration

### Batch Script Configuration

Edit `calibrate-masters.bat` (Windows) or `calibrate-masters.sh` (Linux/Mac) and set:

```batch
set PIXINSIGHT_EXE="C:\Program Files\PixInsight\bin\PixInsight.exe"
```

Adjust the path to match your PixInsight installation.

### Process Icon Paths

Process icons can be specified as:
- Full path to a `.psm` file: `"C:\Path\To\bias.psm"`
- Process icon identifier from workspace: `"BiasIntegration"`

## How It Works

1. **Master Bias**: Integrates all bias frames using your saved process icon
2. **Master Dark**: Integrates all dark frames using your saved process icon
3. **Master Flats**: 
   - Groups flat frames by filter (using FITS `FILTER` keyword)
   - For each filter:
     - Integrates flat frames using your saved process icon (or defaults)
     - Calibrates the integrated master flat with optimized darks (ImageCalibration with `optimize=true`)
     - Saves as `MasterFlat_<FilterName>.fit`

## Output

Master frames are saved to the output directory:
```
output_directory/
  ├── MasterBias.fit
  ├── MasterDark.fit
  ├── MasterFlat_<Filter1>.fit
  ├── MasterFlat_<Filter2>.fit
  └── ...
```

## Flat Frame Filter Detection

The script automatically groups flat frames by reading the `FILTER` FITS keyword. If frames don't have a filter keyword, they're grouped as "NoFilter".

To customize the filter keyword, edit `calibrate-masters.js`:
```javascript
wbppFlats: {
    optimizeDarks: true,
    filterKeyword: "FILTER"  // Change this to your FITS keyword
}
```

## Optimize Darks for Flats

The script automatically enables "Optimize" in ImageCalibration when calibrating master flats with darks. This rescales the master dark to match the thermal noise of each flat frame, handling variations in exposure time and temperature.

This is equivalent to manually checking "Optimize" in WBPP's flat calibration settings for each filter.

## Troubleshooting

### "Process icon not found"
- Verify the process icon path is correct
- Ensure the .psm file exists or the workspace icon identifier is correct
- Use full absolute paths

### "No frames found"
- Check that subdirectories are named correctly: `bias/`, `darks/`, `flats/`
- Verify files have `.fit`, `.fits`, or `.FIT` extensions
- Check that the input directory path is correct

### "PixInsight not found"
- Edit the batch script and set `PIXINSIGHT_EXE` to your installation path
- On Windows, default is: `C:\Program Files\PixInsight\bin\PixInsight.exe`
- On Linux/Mac, default is: `/opt/PixInsight/bin/PixInsight`

### Process icon execution fails
- The script will fall back to default ImageIntegration settings
- For best results, ensure your process icons are properly saved and accessible

## Files

- `calibrate-masters.js` - Main PixInsight script
- `calibrate-masters.bat` - Windows batch wrapper
- `calibrate-masters.sh` - Linux/Mac shell wrapper
- `README.md` - This file

## Notes

- The script runs PixInsight in headless/automation mode
- No GUI interaction is required
- All processing is logged to the console
- Temporary files are automatically cleaned up
- The script exits PixInsight automatically when complete
