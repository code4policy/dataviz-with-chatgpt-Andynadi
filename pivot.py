#!/usr/bin/env python3

import pandas as pd

# Read the CSV file into a pandas DataFrame
data = pd.read_csv('boston_311_2023_raw.csv')

# Group the data by the 'reason' column and count the occurrences of each reason
reason_counts = data.groupby('reason').size().reset_index(name='Count')

# Save the result to a new CSV file
reason_counts.to_csv('boston_311_2023_by_reason.csv', index=False)

# Print the result (optional)
print(reason_counts)

import pandas as pd
import matplotlib.pyplot as plt
import ipywidgets as widgets
from ipywidgets import Button
from matplotlib import pyplot as plt

# Example DataFrame (replace with your actual data)
data = {
    'reason': ['Reason1', 'Reason2', 'Reason3', 'Reason1', 'Reason2', 'Reason1', 'Reason3', 'Reason3', 'Reason1']
}

df = pd.DataFrame(data)

# Function to plot the bar chart
def plot_bar_chart(change):
    # Calculate the counts for the 'reason' column
    reason_counts = df['reason'].value_counts()
    
    # Create a bar chart
    plt.figure(figsize=(10, 6))
    reason_counts.plot(kind='bar', color='skyblue')
    plt.title('Remaining Counts of Reasons')
    plt.xlabel('Reason')
    plt.ylabel('Count')
    plt.xticks(rotation=45)
    plt.tight_layout()
    plt.show()

# Create a button widget
button = Button(description="Show Bar Chart")

# Attach the function to the button's click event
button.on_click(plot_bar_chart)

# Display the button
button
