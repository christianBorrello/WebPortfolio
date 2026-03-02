import {
  Body,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";

interface ContactNotificationProps {
  name: string;
  email: string;
  message: string;
}

const colors = {
  background: "#0a0a0a",
  foreground: "#ededed",
  muted: "#888888",
  accent: "#ededed",
  border: "#2a2a2a",
} as const;

const logoDataUri = `data:image/svg+xml,${encodeURIComponent(
  '<svg width="55" height="36" viewBox="379 612 1312 851" fill="#ededed" fill-rule="evenodd" xmlns="http://www.w3.org/2000/svg"><path transform="scale(2 2)" d="M746.312 318.695C760.884 316.194 784.702 323.623 796.735 331.904C812.165 342.523 820.575 355.002 824.238 373.134C835.252 427.658 788.777 452.559 749.152 475.964C742.442 479.927 731.202 486.082 726.906 492.507C724.76 495.717 724.505 500.486 725.592 504.163C728.467 513.896 734.15 524.453 738.438 533.781C744.816 547.654 749.599 559.578 753.522 574.302C761.452 604.071 763.206 635.988 746.749 663.565C731.644 689.636 708.01 705.183 679.228 712.941C664.579 716.889 642.379 716.83 627.038 714.979C607.961 712.676 589.08 702.373 572.803 692.561C563.491 686.947 554.713 679.162 545.429 673.774L544.793 673.41C541.621 676.298 537.724 680.968 534.755 684.377C526.936 693.358 517.758 702.147 507.202 707.87C492.108 715.73 473.546 718.32 457.105 713.571C433.722 706.816 424.627 683.286 429.931 660.914C430.986 656.465 432.923 651.986 434.324 647.56C427.262 650.644 414.62 661.107 408.34 666.233C389.433 681.662 376.405 692.914 353.763 703.302C324.73 716.621 289.91 721.377 259.346 710.705C236.929 702.877 219.268 685.756 209.697 664.315C203.003 651.064 202.092 638.716 200.534 624.492C199.325 613.46 200.269 608.983 200.794 598.286C202.162 567.51 208.606 537.171 219.865 508.496C246.784 438.43 308.317 363.349 378.057 332.587C405.479 320.492 432.719 315.924 461.214 326.995C475.742 332.825 487.555 342.206 495.961 355.474C507.519 373.72 508.31 397.701 503.025 418.209C494.48 451.366 468.167 483.888 438.725 500.979C432.111 503.92 421.89 511.933 414.611 511.325C412.683 511.164 407.443 504.169 409.211 501.541C411.081 498.761 414.669 497.855 417.691 496.396C421.315 494.588 424.699 491.667 427.914 489.25C461.989 463.63 475.179 422.501 471.882 381.253C471.184 372.515 469.101 365.132 465.341 357.285C461.119 348.477 452.817 339.387 443.283 336.659C424.074 331.163 404.462 337.456 387.401 346.37C324.616 379.19 277.893 460.695 257.059 525.448C250.098 546.702 245.497 568.657 243.339 590.917C242.86 595.578 241.761 602.869 242.062 607.364C243.411 627.445 244.823 648.73 254.091 666.837C276.74 711.084 335.578 696.555 369.465 675.379C381.558 667.822 392.461 656.995 404.067 648.666C412.037 642.732 421.834 637.547 430.645 632.839C452.752 621.025 481.448 613.822 505.78 622.942C513.574 625.864 520.074 630.966 528.282 633.526C532.44 627.033 537.013 614.505 539.841 607.06L552.089 574.361C561.571 548.394 571.381 522.548 581.519 496.829C591.521 471.546 601.152 447.314 614.482 423.491C643.421 371.771 683.952 325.579 746.312 318.695Z M730.012 337.615C743.362 337.057 761.901 340.829 771.994 350.245C782.231 359.796 785.761 371.793 786.56 385.256C788.958 425.67 755.892 453.252 725.774 474.103C715.863 481.249 705.391 487.286 696.762 496.042C685.185 507.385 689.252 522.293 695.168 535.506C715.574 581.08 736.603 631.599 695.797 674.054C682.34 688.188 663.765 696.317 644.252 696.612C636.131 696.47 621.077 695.091 613.878 691.414C598.122 683.365 568.181 667.128 557.31 653.787C559.724 646.271 566.145 637.78 569.678 630.457C609.846 547.281 631.872 454.209 681.513 375.736C693.557 356.696 707.292 341.947 730.012 337.615Z M479.012 638.17C491.346 636.567 510.508 645.737 519.057 654.208C513.348 669.277 499.481 691.362 483.44 696.769C466.637 701.114 448.998 699.482 445.233 678.325C442.292 661.804 454.5 643.828 470.567 639.815C473.407 639.105 476.038 638.609 479.012 638.17Z"/></svg>'
)}`;

export function ContactNotification({
  name,
  email,
  message,
}: ContactNotificationProps) {
  const senderName = name || "Anonymous";

  return (
    <Html style={styles.html}>
      <Head>
        <meta name="color-scheme" content="light dark" />
        <meta name="supported-color-schemes" content="light dark" />
      </Head>
      <Preview>
        New message from {senderName} via portfolio contact form
      </Preview>
      <Body style={styles.body}>
        <Container style={styles.container}>
          <Section style={styles.header}>
            <Img
              src={logoDataUri}
              width="55"
              height="36"
              alt="CB"
              style={styles.logo}
            />
            <Text style={styles.title}>New Contact Message</Text>
          </Section>

          <Hr style={styles.divider} />

          <Section style={styles.fields}>
            <Text style={styles.label}>From</Text>
            <Text style={styles.value}>{senderName}</Text>

            <Text style={styles.label}>Email</Text>
            <Link href={`mailto:${email}`} style={styles.emailLink}>
              {email}
            </Link>
          </Section>

          <Hr style={styles.divider} />

          <Section style={styles.messageSection}>
            <Text style={styles.label}>Message</Text>
            <Text style={styles.messageBody}>
              {message || "No message provided"}
            </Text>
          </Section>

          <Hr style={styles.divider} />

          <Section style={styles.footer}>
            <Text style={styles.footerText}>
              Reply directly to this email to respond to {senderName}.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

const fontFamily =
  "'Dynalight', 'Georgia', 'Times New Roman', serif";

const fontFamilyBody =
  "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif";

const styles = {
  html: {
    colorScheme: "light dark" as const,
  },
  body: {
    backgroundColor: colors.background,
    fontFamily: fontFamilyBody,
    margin: "0",
    padding: "0",
  },
  container: {
    backgroundColor: colors.background,
    border: `1px solid ${colors.border}`,
    borderRadius: "8px",
    margin: "40px auto",
    maxWidth: "480px",
    padding: "32px",
  },
  header: {
    textAlign: "center" as const,
    paddingBottom: "8px",
  },
  logo: {
    margin: "0 auto 12px auto",
  },
  title: {
    color: colors.foreground,
    fontFamily,
    fontSize: "24px",
    fontWeight: "400" as const,
    margin: "0",
  },
  divider: {
    borderColor: colors.border,
    borderTop: `1px solid ${colors.border}`,
    margin: "24px 0",
  },
  fields: {
    padding: "0",
  },
  label: {
    color: colors.muted,
    fontSize: "12px",
    fontWeight: "600" as const,
    letterSpacing: "0.05em",
    margin: "0 0 4px 0",
    textTransform: "uppercase" as const,
  },
  value: {
    color: colors.foreground,
    fontSize: "16px",
    margin: "0 0 16px 0",
  },
  emailLink: {
    color: colors.accent,
    fontSize: "16px",
    textDecoration: "underline",
    display: "block" as const,
    marginBottom: "16px",
  },
  messageSection: {
    padding: "0",
  },
  messageBody: {
    color: colors.foreground,
    fontSize: "15px",
    lineHeight: "1.6",
    margin: "0",
    whiteSpace: "pre-wrap" as const,
  },
  footer: {
    textAlign: "center" as const,
  },
  footerText: {
    color: colors.muted,
    fontSize: "13px",
    margin: "0",
  },
} as const;
