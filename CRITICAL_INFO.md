# Critical Information: Calibration Master Generation

## Overview

This document captures the essential information for automated calibration master generation, moving away from WBPP to direct PixInsight process execution.

## Process Flow

### Bias and Dark Masters
- **Single Process**: ImageIntegration only
- **Bias**: `imageType = 1`
- **Dark**: `imageType = 2`
- **Example Files**: `examples/ii_bias.js`, `examples/ii_dark.js`

### Flat Masters
- **Two-Step Process**:
  1. **ImageCalibration** (`examples/ic_flat.js`) - Calibrate raw flat frames using bias and dark masters
  2. **ImageIntegration** (`examples/ii_flat.js`) - Integrate calibrated flat frames
- **Calibration Step**: Uses master bias and dark, with `optimizeDarks = true`
- **Integration Step**: `imageType = 3`, `normalization = Multiplicative`, `rejectionNormalization = EqualizeFluxes`

## Input File Discovery

### Single Directory Structure

**All data for an imaging session is collected in a single directory** containing:
- Bias frames (rarely captured)
- Dark frames (captured maybe once every 6 months)
- Flat frames (captured most nights, but not every night)
- Light frames (ignored by this automation)

### Frame Type Identification

Frames are identified by the **`TYPE` FITS keyword**:
- `TYPE = "bias"` - Bias frames
- `TYPE = "dark"` - Dark frames  
- `TYPE = "flat"` - Flat frames
- `TYPE = "light"` - Light frames (ignored)

**Critical**: The script must scan the input directory, read the `TYPE` keyword from each file, and organize frames automatically. No subdirectory structure is assumed.

## Grouping Criteria

### Critical: Files Must Be Grouped Before Processing

Grouping ensures that only compatible frames are combined into masters. Different groups produce separate master frames.

### Required Keywords Configuration

Each frame type has a **configurable list of required FITS keywords** for grouping. These are defined in `config.py`:

```python
REQUIRED_KEYWORDS = {
    "bias": ["TYPE", "INSTRUME", "SET-TEMP", "GAIN", "OFFSET", "READOUTM"],
    "dark": ["TYPE", "INSTRUME", "SET-TEMP", "GAIN", "OFFSET", "READOUTM"],
    "flat": ["TYPE", "INSTRUME", "SET-TEMP", "GAIN", "OFFSET", "READOUTM", "DATE", "FILTER"]
}
```

### Bias and Dark Grouping

Group by these FITS keywords (all must match):
- `TYPE` - Must be "bias" or "dark"
- `INSTRUME` - Instrument/camera identifier
- `SET-TEMP` - Sensor temperature setting
- `GAIN` - Camera gain setting
- `OFFSET` - Camera offset setting
- `READOUTM` - Readout mode

**Example**: All bias frames with `INSTRUME=ATR585M`, `SET-TEMP=-10.00`, `GAIN=239`, `OFFSET=150`, `READOUTM=Low Conversion Gain` form one group and produce one master bias.

### Flat Grouping

Group by these FITS keywords (all must match):
- `TYPE` - Must be "flat"
- `INSTRUME` - Instrument/camera identifier
- `SET-TEMP` - Sensor temperature setting
- `GAIN` - Camera gain setting
- `OFFSET` - Camera offset setting
- `READOUTM` - Readout mode
- `DATE` - Observation date
- `FILTER` - Filter identifier

**Note**: For flat calibration, bias and dark masters are matched by instrument settings only (INSTRUME, SET-TEMP, GAIN, OFFSET, READOUTM) - **NOT** by DATE or FILTER. This allows reusing bias/dark masters across different dates and filters.

**Example**: All flat frames with matching instrument settings AND `DATE=2026-01-15` AND `FILTER=B` form one group, are calibrated together using matching bias/dark masters, then integrated into one master flat.

## FITS Header Access

### Important: ap-common Normalization

**The `ap-common` Python module normalizes FITS headers**, which may affect keyword names or values. This is handled by the Python script but **does not affect PixInsight processes**, which receive only file paths.

Use the `ap-common` Python module to extract FITS headers from files:

```python
from ap_common import get_fits_headers

headers = get_fits_headers(file_path)
frame_type = headers.get('TYPE')  # "bias", "dark", "flat", or "light"
instrument = headers.get('INSTRUME')
temperature = headers.get('SET-TEMP')
gain = headers.get('GAIN')
offset = headers.get('OFFSET')
readout = headers.get('READOUTM')
date = headers.get('DATE')
filter_name = headers.get('FILTER')
```

### Finding Matching Masters for Flat Calibration

For flat calibration, use `ap-common` functionality to fetch metadata about master directories and apply filters:

```python
from ap_common import get_metadata_for_directory

# Find matching bias master
bias_masters = get_metadata_for_directory(
    bias_master_dir,
    filter_func=lambda m: (
        m.get('INSTRUME') == flat_instrument and
        m.get('SET-TEMP') == flat_temp and
        m.get('GAIN') == flat_gain and
        m.get('OFFSET') == flat_offset and
        m.get('READOUTM') == flat_readout
    )
)
```

This allows dynamically loading matching bias/dark masters based on instrument settings only, without requiring date or filter matching.

## Master Calibration Generation Workflow

### Step 1: Discover and Group Files

1. **Scan input directory** recursively for all `.fits`/`.fit` files
2. **Read `TYPE` keyword** from each file using `ap-common`
3. **Filter out lights** - ignore files where `TYPE = "light"`
4. **Extract FITS headers** using `ap-common` for each calibration frame
5. **Group files** by the appropriate criteria (from `config.py`):
   - Bias: `(TYPE, INSTRUME, SET-TEMP, GAIN, OFFSET, READOUTM)`
   - Dark: `(TYPE, INSTRUME, SET-TEMP, GAIN, OFFSET, READOUTM)`
   - Flat: `(TYPE, INSTRUME, SET-TEMP, GAIN, OFFSET, READOUTM, DATE, FILTER)`

**Important**: Support zero or more of each type. If no bias frames exist, skip bias master generation. If no darks exist, skip dark master generation. If no flats exist, skip flat master generation.

### Step 2: Generate Bias Masters

For each bias group:
1. Create `ImageIntegration` process instance
2. Set `imageType = 1`
3. Configure process parameters (see `examples/ii_bias.js`)
4. Set `images` array with all files in the group
5. Execute `executeGlobal()`
6. Save master to output directory with descriptive filename

### Step 3: Generate Dark Masters

For each dark group:
1. Create `ImageIntegration` process instance
2. Set `imageType = 2`
3. Configure process parameters (see `examples/ii_dark.js`)
4. Set `images` array with all files in the group
5. Execute `executeGlobal()`
6. Save master to output directory with descriptive filename

### Step 4: Generate Flat Masters

For each flat group (by instrument settings + date + filter):
1. **Find Matching Masters**:
   - Use `ap-common` to search bias master directory for matching instrument settings
   - Use `ap-common` to search dark master directory for matching instrument settings
   - Match only on: `INSTRUME`, `SET-TEMP`, `GAIN`, `OFFSET`, `READOUTM`
   - **Do NOT** match on `DATE` or `FILTER` (masters can be reused across dates/filters)
   
2. **Calibration Step**:
   - Create `ImageCalibration` process instance
   - Set `targetFrames` array with all raw flat files in the group
   - Set `masterBiasPath` to matching bias master (if available)
   - Set `masterDarkPath` to matching dark master (if available)
   - Set `optimizeDarks = true` (critical for flats)
   - Configure output directory for calibrated flats
   - Execute `executeGlobal()`
   
3. **Integration Step**:
   - Create `ImageIntegration` process instance
   - Set `imageType = 3`
   - Set `normalization = Multiplicative`
   - Set `rejectionNormalization = EqualizeFluxes`
   - Set `images` array with all calibrated flat files from step 2
   - Execute `executeGlobal()`
   - Save master to output directory with descriptive filename

**Note**: Bias and dark masters may be in separate directories and are referenced dynamically. The script should support configuration of these master library directories.

## Master File Naming

Masters should be named to reflect their grouping criteria:

**Bias**: `masterBias_INSTRUME-{instrument}_SETTEMP-{temp}_GAIN-{gain}_OFFSET-{offset}_READOUTM-{readout}.xisf`

**Dark**: `masterDark_EXPOSURE-{exp}_INSTRUME-{instrument}_SETTEMP-{temp}_GAIN-{gain}_OFFSET-{offset}_READOUTM-{readout}.xisf`

**Flat**: `masterFlat_FILTER-{filter}_INSTRUME-{instrument}_DATE-{date}_SETTEMP-{temp}_GAIN-{gain}_OFFSET-{offset}_READOUTM-{readout}.xisf`

## Implementation Considerations

1. **File Discovery**: Recursively scan input directory for `.fits`/`.fit` files
2. **Header Extraction**: Use `ap-common` Python module for reliable FITS header access
3. **Grouping Logic**: Create dictionary/hash map keyed by grouping criteria tuple
4. **Process Configuration**: Use example files as templates, parameterize file lists
5. **Output Management**: Organize masters in output directory, ensure unique filenames
6. **Error Handling**: Validate file existence, check for required FITS keywords, handle missing masters
7. **Flat Dark Optimization**: Critical that `optimizeDarks = true` for flat calibration

## Configuration

### config.py

The `config.py` file defines:
- `REQUIRED_KEYWORDS`: Dictionary mapping frame types to lists of required FITS keywords
- `MASTER_MATCH_KEYWORDS`: Keywords used to match bias/dark masters to flats (instrument settings only)
- `IGNORED_TYPES`: Frame types to ignore (e.g., "light")

This configuration is explicit and separate for each frame type, allowing easy modification without merging logic.

### Frame Type Detection

The `TYPE` FITS keyword is the primary identifier:
- Must be present in all calibration frames
- Values: "bias", "dark", "flat", "light"
- Used to filter out lights and organize frames by type

## Implementation Approach

### Python Script Responsibilities

1. **File Discovery**: Recursively scan input directory for `.fits`/`.fit` files
2. **Type Filtering**: Read `TYPE` keyword, ignore lights, organize by type
3. **Header Extraction**: Use `ap-common` to get FITS headers (handles normalization)
4. **Grouping**: Group files by required keywords from `config.py`
5. **Master Matching**: For flats, find matching bias/dark masters using `ap-common` directory metadata
6. **Script Generation**: Generate PixInsight JavaScript scripts for each group
7. **Orchestration**: Execute generated scripts in PixInsight

### PixInsight Script Responsibilities

1. **Process Execution**: Run `ImageIntegration` or `ImageCalibration` + `ImageIntegration`
2. **File Lists**: Receive file paths as arrays (no FITS header reading needed)
3. **Output Management**: Save masters to specified output directory

### Workflow

```
Input Directory (single dir with all frames)
    ↓
Python: Discover files, read TYPE keyword
    ↓
Python: Filter out lights, organize by type
    ↓
Python: Extract headers, group by required keywords
    ↓
Python: For flats, find matching bias/dark masters
    ↓
Python: Generate PixInsight JS scripts (one per group)
    ↓
Batch Script: Execute each JS script in PixInsight
    ↓
Output Directory: Master calibration frames
```

## Key Differences from WBPP

- **No WBPP Script**: Direct use of `ImageIntegration` and `ImageCalibration` processes
- **Manual Grouping**: Grouping logic implemented in Python using FITS headers
- **Explicit Process Control**: Full control over process parameters, no WBPP abstraction
- **Simpler Workflow**: Bias/Dark are single-step, Flats are two-step (calibrate then integrate)
- **Single Directory Input**: All frames in one directory, organized by TYPE keyword
- **Zero-or-More Support**: Handles any combination of available frame types gracefully
