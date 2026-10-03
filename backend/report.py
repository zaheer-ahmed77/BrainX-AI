import os
from reportlab.lib.pagesizes import letter
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Image, Table, TableStyle
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib import colors
from datetime import datetime

def generate_pdf_report(analysis_data, output_path):
    doc = SimpleDocTemplate(output_path, pagesize=letter, rightMargin=72, leftMargin=72, topMargin=72, bottomMargin=18)
    styles = getSampleStyleSheet()
    
    # Custom Styles
    title_style = ParagraphStyle(
        'TitleStyle',
        parent=styles['Heading1'],
        fontSize=24,
        textColor=colors.HexColor("#1A202C"),
        spaceAfter=14
    )
    
    heading_style = ParagraphStyle(
        'HeadingStyle',
        parent=styles['Heading2'],
        fontSize=14,
        textColor=colors.HexColor("#2D3748"),
        spaceBefore=14,
        spaceAfter=6
    )

    body_style = styles["BodyText"]
    
    disclaimer_style = ParagraphStyle(
        'Disclaimer',
        parent=styles['Italic'],
        fontSize=9,
        textColor=colors.HexColor("#718096"),
        spaceBefore=20
    )

    Story = []

    # Title
    Story.append(Paragraph("BrainX AI - Analysis Report", title_style))
    Story.append(Paragraph(f"Analysis ID: {analysis_data['id']}", body_style))
    Story.append(Paragraph(f"Date: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}", body_style))
    Story.append(Spacer(1, 12))

    # Results Table
    Story.append(Paragraph("Analysis Results", heading_style))
    
    confidence_str = f"{analysis_data['confidence'] * 100:.1f}%"
    data = [
        ['Predicted Class:', analysis_data['prediction']],
        ['Model Confidence:', confidence_str],
    ]
    
    t = Table(data, colWidths=[150, 300])
    t.setStyle(TableStyle([
        ('TEXTCOLOR', (0,0), (-1,-1), colors.HexColor("#2D3748")),
        ('ALIGN', (0,0), (-1,-1), 'LEFT'),
        ('FONTNAME', (0,0), (0,-1), 'Helvetica-Bold'),
        ('FONTNAME', (1,0), (1,-1), 'Helvetica'),
        ('BOTTOMPADDING', (0,0), (-1,-1), 8),
    ]))
    Story.append(t)
    Story.append(Spacer(1, 12))

    # Probabilities
    Story.append(Paragraph("Class Probabilities", heading_style))
    probs = analysis_data['probabilities']
    prob_data = [['Class', 'Probability']]
    for k, v in probs.items():
        prob_data.append([k, f"{v * 100:.1f}%"])
        
    t_prob = Table(prob_data, colWidths=[150, 150])
    t_prob.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), colors.HexColor("#EDF2F7")),
        ('TEXTCOLOR', (0,0), (-1,0), colors.HexColor("#2D3748")),
        ('ALIGN', (0,0), (-1,-1), 'LEFT'),
        ('FONTNAME', (0,0), (-1,0), 'Helvetica-Bold'),
        ('BOTTOMPADDING', (0,0), (-1,-1), 6),
        ('GRID', (0,0), (-1,-1), 0.5, colors.lightgrey),
    ]))
    Story.append(t_prob)
    Story.append(Spacer(1, 12))

    # Images
    Story.append(Paragraph("Visualizations", heading_style))
    img_table_data = []
    
    img_row = []
    if os.path.exists(analysis_data['image_path']):
        img_row.append(Image(analysis_data['image_path'], width=200, height=200))
    else:
        img_row.append(Paragraph("Original Image Not Found", body_style))

    if os.path.exists(analysis_data['overlay_path']):
        img_row.append(Image(analysis_data['overlay_path'], width=200, height=200))
    else:
        img_row.append(Paragraph("Heatmap Not Found", body_style))
        
    img_table_data.append(img_row)
    img_table_data.append(['Original MRI', 'Grad-CAM Overlay'])
    
    t_img = Table(img_table_data, colWidths=[230, 230])
    t_img.setStyle(TableStyle([
        ('ALIGN', (0,0), (-1,-1), 'CENTER'),
        ('FONTNAME', (0,1), (-1,1), 'Helvetica-Bold'),
    ]))
    Story.append(t_img)
    Story.append(Spacer(1, 16))

    # Explanation
    Story.append(Paragraph("AI-Generated Explanation", heading_style))
    # Replace newlines with <br/> for ReportLab
    exp_text = analysis_data['explanation'].replace('\n', '<br/>')
    Story.append(Paragraph(exp_text, body_style))
    
    # Disclaimer
    disclaimer_text = "Important: BrainXAI provides an AI-based preliminary analysis of brain MRI images for informational purposes. It is not a medical diagnosis and should not replace evaluation by a qualified healthcare professional."
    Story.append(Paragraph(disclaimer_text, disclaimer_style))

    doc.build(Story)
    return output_path
