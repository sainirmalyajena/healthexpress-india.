import {
    Body,
    Container,
    Head,
    Heading,
    Hr,
    Html,
    Preview,
    Section,
    Text,
} from "@react-email/components";
import * as React from "react";

interface AdminNotificationEmailProps {
    referenceId: string;
    fullName: string;
    phone: string;
    email?: string;
    city: string;
    surgeryName: string;
    sourcePage: string;
}

export const AdminNotificationEmail = ({
    referenceId,
    fullName,
    phone,
    email,
    city,
    surgeryName,
    sourcePage,
}: AdminNotificationEmailProps) => (
    <Html>
        <Head />
        <Preview>New Lead: {surgeryName} - {fullName}</Preview>
        <Body style={main}>
            <Container style={container}>
                <Section style={header}>
                    <Heading style={heading}>New Surgery Inquiry</Heading>
                </Section>
                <Section style={content}>
                    <Text style={paragraph}>A new lead has been captured:</Text>
                    <Section style={detailsTable}>
                        <Text style={label}>Patient Name:</Text>
                        <Text style={value}>{fullName}</Text>

                        <Text style={label}>Phone:</Text>
                        <Text style={value}>{phone}</Text>

                        <Text style={label}>Email:</Text>
                        <Text style={value}>{email || "Not provided"}</Text>

                        <Text style={label}>Surgery:</Text>
                        <Text style={value}><strong>{surgeryName}</strong></Text>

                        <Text style={label}>City:</Text>
                        <Text style={value}>{city}</Text>

                        <Hr style={hr} />

                        <Text style={label}>Reference ID:</Text>
                        <Text style={value}><code style={code}>{referenceId}</code></Text>

                        <Text style={label}>Source Page:</Text>
                        <Text style={value}>{sourcePage}</Text>
                    </Section>
                    <Hr style={hr} />
                    <Text style={footer}>
                        HealthExpress India Internal Notification
                    </Text>
                </Section>
            </Container>
        </Body>
    </Html>
);

export default AdminNotificationEmail;

const main = {
    backgroundColor: "#fcedf0",
    fontFamily:
        '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
    backgroundColor: "#ffffff",
    margin: "0 auto",
    padding: "20px 0 48px",
    marginBottom: "64px",
    borderRadius: "8px",
    border: "1px solid #f9d5db",
};

const header = {
    padding: "32px",
};

const heading = {
    fontSize: "24px",
    letterSpacing: "-0.5px",
    lineHeight: "1.3",
    fontWeight: "bold",
    color: "#be123c",
    textAlign: "center" as const,
};

const content = {
    padding: "0 32px",
};

const paragraph = {
    fontSize: "16px",
    lineHeight: "26px",
    color: "#484848",
};

const detailsTable = {
    padding: "16px",
    backgroundColor: "#fff1f2",
    borderRadius: "8px",
};

const label = {
    fontSize: "12px",
    color: "#991b1b",
    textTransform: "uppercase" as const,
    letterSpacing: "0.05em",
    margin: "12px 0 4px",
};

const value = {
    fontSize: "16px",
    color: "#1f2937",
    margin: "0 0 12px",
};

const code = {
    color: "#be123c",
    backgroundColor: "#fecdd3",
    padding: "2px 4px",
    borderRadius: "4px",
};

const hr = {
    borderColor: "#f9d5db",
    margin: "20px 0",
};

const footer = {
    color: "#9ca3af",
    fontSize: "12px",
    lineHeight: "16px",
    textAlign: "center" as const,
};
