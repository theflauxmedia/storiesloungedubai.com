import { SITE } from '../config/seo'

export function buildWhatsAppUrl(message) {
  const text = encodeURIComponent(message.trim())
  return `https://wa.me/${SITE.phoneWhatsApp}?text=${text}`
}

export function openWhatsApp(message) {
  window.location.href = buildWhatsAppUrl(message)
}

function formatLines(lines) {
  return lines.filter(Boolean).join('\n')
}

export function reservationWhatsAppMessage(form) {
  return formatLines([
    'Hello Stories Lounge Dubai,',
    '',
    'I would like to reserve a table.',
    '',
    `Name: ${form.name}`,
    `Phone: ${form.phone}`,
    `Date: ${form.date}`,
    `Time: ${form.time}`,
    `Guests: ${form.guests}`,
    form.notes?.trim() ? `Notes: ${form.notes.trim()}` : null,
  ])
}

export function eventEnquiryWhatsAppMessage(form) {
  return formatLines([
    'Hello Stories Lounge Dubai,',
    '',
    'I would like to enquire about a private event.',
    '',
    `Name: ${form.name}`,
    `Email: ${form.email}`,
    `Phone: ${form.phone}`,
    `Event Type: ${form.eventType}`,
    `Date: ${form.date}`,
    `Guest Count: ${form.guestCount}`,
    form.message?.trim() ? `Message: ${form.message.trim()}` : null,
  ])
}

export const GENERAL_WHATSAPP_MESSAGE =
  'Hello Stories Lounge Dubai, I would like to get in touch.'

export const RESERVE_TABLE_WHATSAPP_MESSAGE =
  'Hello Stories Lounge Dubai, I would like to reserve a table.'

export const generalWhatsAppUrl = buildWhatsAppUrl(GENERAL_WHATSAPP_MESSAGE)
export const reserveTableWhatsAppUrl = buildWhatsAppUrl(RESERVE_TABLE_WHATSAPP_MESSAGE)
